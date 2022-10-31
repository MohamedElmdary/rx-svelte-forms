import AbstractControl, { Status } from "../internals/abstract_control";
import { FormControlValue, FormControlErrors, FormResult } from "../types";

type FCE = string | number | boolean;
type Validator<T extends FCE> = (ctrl: FormControl<T>) => FormControlErrors; // prettier-ignore
type AsyncValidator<T extends FCE> = (ctrl: FormControl<T>) => Promise<FormControlErrors>; // prettier-ignore

class FormControl<T extends FCE> extends AbstractControl<
    FormControlValue<T>,
    T
> {
    private __status: Status;
    private __required = false;

    private __defaultValue: T;
    private __value: T;
    public get value(): FormResult<T> {
        return this.__value as FormResult<T>;
    }
    public setValue(value: T): void {
        this.__value = value;
        this.validate();
    }

    private __input?: HTMLElement;
    set input(input: HTMLElement) {
        this.__input = input;
    }

    private __error: FormControlErrors;
    public get error(): FormControlErrors {
        return this.__error;
    }
    public set error(error: FormControlErrors) {
        this.__error = error;
        this.__status = !error ? Status.valid : Status.invalid;
        this.notifyListeners();
    }

    private __defaultValidators: Validator<T>[];
    private __validators: Validator<T>[];
    private __defaultAsyncValidators: AsyncValidator<T>[];
    private __asyncValidators: AsyncValidator<T>[];

    public get valid(): boolean {
        return this.__status === Status.valid;
    }

    public get pending(): boolean {
        return this.__status === Status.pending;
    }

    private __touched: boolean;
    public get touched(): boolean {
        return this.__touched;
    }

    private __dirty: boolean;
    public get dirty(): boolean {
        return this.__dirty;
    }

    constructor(
        value: T,
        validators?: Validator<T>[],
        asyncValidators?: AsyncValidator<T>[]
    ) {
        super();
        this.__defaultValue = value;
        this.__value = value;
        this.__defaultValidators = validators || [];
        this.__validators = [...this.__defaultValidators];
        this.__defaultAsyncValidators = asyncValidators || [];
        this.__asyncValidators = [...this.__defaultAsyncValidators];
        this.__status = Status.invalid;
        this.__touched = false;
        this.__dirty = false;

        this.__setRequired();
        this.validate();
    }

    public markAsTouched(): void {
        if (!this.__touched) {
            this.__touched = true;
            this.notifyListeners();
        }
    }

    public markAsDirty(): void {
        if (!this.__dirty) {
            this.__dirty = true;
            this.notifyListeners();
        }
    }

    public async validate(): Promise<void> {
        this.__status = Status.pending;
        this.notifyListeners();

        /* Support special validator (required) */
        if (!this.__required) {
            if (
                this.value === "" ||
                this.value === undefined ||
                this.value === null
            ) {
                this.error = undefined;
                return;
            }
        }

        for (const validators of [this.__validators, this.__asyncValidators]) {
            for (const validator of validators) {
                const error = await validator(this);
                if (error) {
                    this.error = error;
                    break;
                }
            }
        }
    }

    public getValue(): FormControlValue<T> {
        return {
            value: this.__value,
            valid: this.valid,
            dirty: this.dirty,
            invalid: this.invalid,
            pending: this.pending,
            pristine: this.pristine,
            touched: this.touched,
            untouched: this.untouched,
            error: this.error?.message,
        };
    }

    public setDisabled(value: boolean): void {
        if (value === false) {
            return this.__input?.removeAttribute("disabled");
        }
        this.__input?.setAttribute("disabled", "");
    }

    public addValidator(fn: Validator<T>): void {
        this.__validators.push(fn);
        this.validate();
    }

    public addAsyncValidator(fn: AsyncValidator<T>): void {
        this.__asyncValidators.push(fn);
        this.validate();
    }

    public removeValidator(fn: Validator<T>): void {
        const idx = this.__validators.findIndex((v) => v === fn);
        if (idx > -1) {
            this.__validators.splice(idx, 1);
            this.validate();
        }
    }

    public removeAsyncValidator(fn: AsyncValidator<T>): void {
        const idx = this.__asyncValidators.findIndex((v) => v === fn);
        if (idx > -1) {
            this.__asyncValidators.splice(idx, 1);
            this.validate();
        }
    }

    public reset(): void {
        this.__value = this.__defaultValue;
        this.__validators = [...this.__defaultValidators];
        this.__asyncValidators = [...this.__defaultAsyncValidators];
        this.__status = Status.invalid;
        this.__touched = false;
        this.__dirty = false;

        this.__setRequired();
        this.validate();
    }

    private __setRequired(): void {
        for (const validator of this.__validators) {
            const error = validator({ value: null } as any);
            if (error && error.required) {
                this.__required = true;
                return;
            }
        }
        this.__required = false;
    }
}

export {
    FCE,
    FormControl as default,
    FormControlErrors,
    FormControlValue,
    Validator,
    AsyncValidator,
};

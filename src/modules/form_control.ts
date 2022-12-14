import AbstractControl, { Status } from "../internals/abstract_control";
import { FormControlValue, FormControlErrors, FormResult } from "../types";

type FCE = string | number | boolean;
type Validator<T extends FCE, C = any> = (ctrl: FormControl<T, C>, ctx?: C) => FormControlErrors; // prettier-ignore
type AsyncValidator<T extends FCE, C = any> = (ctrl: FormControl<T, C>, ctx?: C) => Promise<FormControlErrors>; // prettier-ignore

class FormControl<T extends FCE, C = any> extends AbstractControl<
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
    public setValue(value: T, ctx?: C): void {
        this.__value = value;
        this.validate(ctx);
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

    public async validate(ctx?: C): Promise<void> {
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
                const error = await validator(this, ctx);
                if (error) {
                    this.error = error;
                    return;
                }
            }
        }

        this.error = undefined;
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

    public addValidator(
        fn: Validator<T>,
        index: number = this.__validators.length,
        ctx?: C
    ): void {
        const idx = Math.max(0, Math.min(this.__validators.length, index));
        this.__validators.splice(idx, 0, fn);
        this.__setRequired();
        this.validate(ctx);
    }

    public addAsyncValidator(
        fn: AsyncValidator<T>,
        index: number = this.__asyncValidators.length,
        ctx?: C
    ): void {
        const idx = Math.max(0, Math.min(this.__asyncValidators.length, index));
        this.__asyncValidators.splice(idx, 0, fn);
        this.__setRequired();
        this.validate(ctx);
    }

    public removeValidator(fn: Validator<T>, ctx?: C): void {
        const idx = this.__validators.findIndex((v) => v === fn);
        if (idx > -1) {
            this.__validators.splice(idx, 1);
            this.__setRequired();
            this.validate(ctx);
        }
    }

    public removeAsyncValidator(fn: AsyncValidator<T>, ctx?: C): void {
        const idx = this.__asyncValidators.findIndex((v) => v === fn);
        if (idx > -1) {
            this.__asyncValidators.splice(idx, 1);
            this.__setRequired();
            this.validate(ctx);
        }
    }

    public reset(ctx?: C): void {
        this.__value = this.__defaultValue;
        this.__validators = [...this.__defaultValidators];
        this.__asyncValidators = [...this.__defaultAsyncValidators];
        this.__status = Status.invalid;
        this.__touched = false;
        this.__dirty = false;

        this.__setRequired();
        this.validate(ctx);
    }

    private __setRequired(ctx?: C): void {
        for (const validator of this.__validators) {
            const error = validator({ value: null } as any, ctx);
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

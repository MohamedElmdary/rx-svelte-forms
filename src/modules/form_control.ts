import AbstractControl, { Status } from "../internals/abstract_control";
import utils from "../utils";
import { FormControlValue, FormControlErrors, FormResult } from "../types";
import { validators } from "public_api";

type FCE = string | number | boolean;
type Validator<T extends FCE> = (ctrl: FormControl<T>) => FormControlErrors | undefined | void; // prettier-ignore
type AsyncValidator<T extends FCE> = (ctrl: FormControl<T>) => Promise<FormControlErrors | undefined | void>; // prettier-ignore

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

    private __errors: FormControlErrors = {};
    public get errors(): FormControlErrors {
        return this.__errors;
    }
    public set errors(errors: FormControlErrors) {
        this.__errors = errors;
        this.__status =
            Object.keys(errors).length === 0 ? Status.valid : Status.invalid;
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
                this.errors = {};
                return;
            }
        }

        let errors: FormControlErrors = {};

        for (const validator of this.__validators) {
            const error = validator(this);
            if (!error) continue;
            errors = utils.merge(errors, error);
        }

        if (Object.keys(errors).length === 0) {
            for (const validator of this.__asyncValidators) {
                const error = await validator(this);
                if (!error) continue;
                errors = utils.merge(errors, error);
                break;
            }
        }

        this.errors = errors;
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
            errors: this.errors,
        };
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

import AbstractControl, { Status } from "../internals/abstract_control";
import utils from "../utils";

type FormControlErrors = { [key: string]: any };
interface FormControlValue<T> {
    value: T;
    valid: boolean;
    invalid: boolean;
    pending: boolean;
    touched: boolean;
    untouched: boolean;
    dirty: boolean;
    pristine: boolean;
    errors: FormControlErrors;
}

type Validator<T> = (value: T) => FormControlErrors | undefined;
type AsyncValidator<T> = (value: T) => Promise<FormControlErrors | undefined>;

class FormControl<T> extends AbstractControl<FormControlValue<T>> {
    private __status: Status;

    private __defaultValue: T;
    private __value: T;
    public get value(): T {
        return this.__value;
    }
    public setValue(value: T): void {
        this.__value = value;
        if (!this.__touched) {
            return this.notifyListeners();
        }
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

    public get invalid(): boolean {
        return this.__status !== Status.valid;
    }

    public get pending(): boolean {
        return this.__status === Status.pending;
    }

    private __touched: boolean;
    public get touched(): boolean {
        return this.__touched;
    }

    public get untouched(): boolean {
        return !this.__touched;
    }

    private __dirty: boolean;
    public get dirty(): boolean {
        return this.__dirty;
    }

    public get pristine(): boolean {
        return !this.__dirty;
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
        let errors: FormControlErrors = {};

        for (const validator of this.__validators) {
            const error = validator(this.value);
            if (!error) continue;
            errors = utils.merge(errors, error);
        }

        if (Object.keys(errors).length === 0) {
            for (const validator of this.__asyncValidators) {
                const error = await validator(this.value);
                if (!error) continue;
                errors = utils.merge(errors, error);
                break;
            }
        }

        this.errors = errors;
    }

    public getValue(): FormControlValue<T> {
        return {
            value: this.value,
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

    public override notifyListeners(): void {
        super.notifyListeners();
        this.root?.notifyListeners();
    }
}

export {
    FormControl as defaultValue,
    FormControlErrors,
    FormControlValue,
    Validator,
    AsyncValidator,
};

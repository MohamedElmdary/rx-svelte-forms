import type { FormControl } from "../modules/FormControl"

export type ValidatorResult = string | undefined;
export type Validator<T> = (value: FormControl<T>) => ValidatorResult;
export type AsyncValidator<T> = (value: FormControl<T>) => Promise<ValidatorResult>;
export interface ControlValue<T> {
    value: T;
    valid: boolean;
    invalid: boolean;
    dirty: boolean;
    touched: boolean;
    untouched: boolean;
    pristine: boolean;
    pending: boolean;
    error: string | undefined;
}

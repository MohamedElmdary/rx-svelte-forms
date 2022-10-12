import type { default as FC } from "../modules/form_control";
import type { default as FG } from "../modules/form_group";
import type { default as FA } from "../modules/form_array";

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

type FormValue<T> = Omit<FormControlValue<T>, "errors">;

type ExtractFormValue<T1> = T1 extends FA<infer T2>
    ? FormValue<ExtractFormValue<T2 extends Array<infer T3> ? T3 : T2>[]>
    : T1 extends FG<infer T2>
    ? FormValue<{
          [K in keyof T2]: T2[K] extends FC<infer T3>
              ? FormControlValue<T3>
              : FormValue<ExtractFormValue<T2[K]>>;
      }>
    : T1 extends FC<infer T2>
    ? FormControlValue<T2>
    : T1;

type FormResult<T1> = T1 extends Array<infer T2>
    ? FormResult<T2>[]
    : T1 extends FA<infer T2>
    ? FormResult<T2>
    : T1 extends FG<infer T2>
    ? { [K in keyof T2]: FormResult<T2[K]> }
    : T1 extends FC<infer T2>
    ? T2
    : T1 extends object
    ? { [K in keyof T1]: FormResult<T1[K]> }
    : T1;

export {
    FormControlErrors,
    FormControlValue,
    FormValue,
    ExtractFormValue,
    FormResult,
};

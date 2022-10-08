import type { FormGroup, FormControl, FormArray } from "../modules"
import { FormArrayExtends } from "./formArray";
import { ControlValue } from "./formControl"

export type FormGroupConfig<T> = {
    [K in keyof T]:
      | FormGroup<T[K] extends object ? T[K] : object>
      | FormControl<T[K]>
      | FormArray<T[K] extends FormArrayExtends ? T[K] : FormArrayExtends>;
};
export type GroupValue<T> = { [K in keyof T]: T[K] };
export type FullGroupValue<T> = { [K in keyof T]: ControlValue<T[K]> };
export type GetValue<T extends object, K extends keyof T> =
    T[K] extends FormArrayExtends ?
        FormArray<T[K]> :
        T[K] extends object ?
            FormGroup<T[K]> :
            FormControl<T[K]>;
export type FormGroupValue<T> = Omit<ControlValue<T>, "error">;

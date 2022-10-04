import type { FormGroup, FormControl } from "../modules"
import { ControlValue } from "./formControl"

export type FormGroupConfig<T> = {
    [K in keyof T]:
      | FormGroup<T[K] extends object ? T[K] : object>
      | FormControl<T[K]>;
};
export type GroupValue<T> = { [K in keyof T]: T[K] };
export type GetValue<T extends object, K extends keyof T> = T[K] extends object
  ? FormGroup<T[K]>
  : FormControl<T[K]>;
export type FormGroupValue<T> = Omit<ControlValue<T>, "error">;

import type { AsyncValidator, Validator } from "./formControl"
import type { FormArray, FormGroup } from "../modules"
import { FormArrayExtends } from "./formArray"

export type GroupOptions<T extends object> = {
  [K in keyof T]:
    | [
        value: T[K],
        valiators?: Validator<T[K]>[],
        asyncValidators?: AsyncValidator<T[K]>[]
      ]
    | FormGroup<T[K] extends object ? T[K] : object>
    | FormArray<T[K] extends FormArrayExtends ? T[K] : FormArrayExtends>;
};

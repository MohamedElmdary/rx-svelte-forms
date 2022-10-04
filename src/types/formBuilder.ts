import type { AsyncValidator, Validator } from "./formControl"
import type { FormGroup } from "../modules"

export type GroupOptions<T extends object> = {
  [K in keyof T]:
    | [
        value: T[K],
        valiators?: Validator<T[K]>[],
        asyncValidators?: AsyncValidator<T[K]>[]
      ]
    | FormGroup<T[K] extends object ? T[K] : object>;
};

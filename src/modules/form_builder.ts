import FormControl, { AsyncValidator, Validator } from "./form_control";
import FormGroup from "./form_group";
import FormArray from "./form_array";
import AbstractControl from "internals/abstract_control";

type _FAE = AbstractControl<any, any>[];
type FormGroupBuilder<T extends object> = {
    [K in keyof T]:
        | [
              value?: T[K],
              validators?: Validator<T[K]>[] | undefined,
              asyncValidators?: AsyncValidator<T[K]>[] | undefined
          ]
        | FormGroup<T[K] extends object ? T[K] : object>
        | FormArray<T[K] extends _FAE ? T[K] : _FAE>;
};

type NormalizeFormGroup<T extends object> = {
    [K in keyof T]: T[K] extends string | number | boolean
        ? FormControl<T[K]>
        : T[K] extends _FAE
        ? FormArray<T[K]>
        : T[K] extends object
        ? FormGroup<T[K]>
        : T[K];
};

class FormBuilder {
    static control<T extends string | number | boolean>(
        value?: T,
        validators?: Validator<T>[],
        asyncValidators?: AsyncValidator<T>[]
    ): FormControl<T> {
        return new FormControl<T>(
            value as T,
            validators || [],
            asyncValidators || []
        );
    }

    static group<T extends object>(
        configs: FormGroupBuilder<T>
    ): FormGroup<NormalizeFormGroup<T>> {
        return new FormGroup(
            Object.keys(configs).reduce((out, key) => {
                const config = (<any>configs)[key];
                out[key] =
                    config instanceof Array
                        ? FormBuilder.control(...config)
                        : config;
                return out;
            }, {} as any)
        );
    }

    static array<T extends _FAE>(configs: T): FormArray<T> {
        return new FormArray<T>(configs);
    }
}

export { FormBuilder as default };

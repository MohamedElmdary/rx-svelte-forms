import type { AsyncValidator, FormArrayExtends, FormGroupConfig, GroupOptions, Validator } from "../types"
import { FormArray } from "./FormArray"
import { FormControl } from "./FormControl"
import { FormGroup } from "./FormGroup"

export class FormBuilder {
    control<T>(
        value: T,
        validators?: Validator<T>[],
        asyncValidators?: AsyncValidator<T>[]
    ) {
        return new FormControl(value, validators, asyncValidators)
    }

    group<T extends object>(configs: GroupOptions<T>): FormGroup<T> {
        const groupConfigs = Object.entries(configs).reduce((c, [key, value]) => {
            c[key] = value instanceof Array ?
                new FormControl(value[0], value[1], value[2])
                : value
            return c
        }, {} as { [key: string]: unknown }) as FormGroupConfig<T>
        return new FormGroup<T>(groupConfigs)
    }

    array<T extends FormArrayExtends>(
        data: T
    ): FormArray<T> {
        return new FormArray<T>(data)
    }
}

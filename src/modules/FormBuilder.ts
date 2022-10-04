import type { FormGroupConfig, GroupOptions } from "../types"
import { FormControl } from "./FormControl"
import { FormGroup } from "./FormGroup"

export class FormBuilder {
    group<T extends object>(configs: GroupOptions<T>): FormGroup<T> {
        const groupConfigs = Object.entries(configs).reduce((c, [key, value]) => {
            c[key] = value instanceof Array ?
                new FormControl(value[0], value[1], value[2])
                : value
            return c
        }, {} as { [key: string]: unknown }) as FormGroupConfig<T>
        return new FormGroup<T>(groupConfigs)
    }
}

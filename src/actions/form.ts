import { FormGroup } from "../modules"
import { formControl } from "./formControl"

export function form<T extends object>(
    f: HTMLFormElement,
    schema: FormGroup<T>
) {
    schema.keys.forEach((key) => {
        const ctrl = schema.get(key)

        if (ctrl instanceof FormGroup) {
            const _f = f.querySelector(`[name=${key as string}]`) as HTMLFormElement
            if (!_f) {
                throw new Error(`Couldn't find 'FormGroup' with name=${key as string}.`)
            }
            return form(_f, ctrl)
        }

        const els = f.querySelectorAll(`[name=${key as string}]`) as unknown as HTMLInputElement[]
        if (els.length === 0) {
            throw new Error(`Couldn't find 'HTMLElement' with name=${key as string}.`)
        }
        for (const el of els) {
            formControl(el, ctrl)
        }
    })
}

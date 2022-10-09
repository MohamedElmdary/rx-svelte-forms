import { FormArray, FormControl, FormGroup } from "../modules"
import { formControl } from "./formControl"

export function form(
    f: HTMLFormElement,
    schema: FormGroup<any> | FormArray<any>
) {
    if (schema instanceof FormGroup) {
        schema.keys.forEach((key) => {
            const ctrl = schema.get(key)
            return __form(f, key as string, ctrl)
        })
    } else {
        schema.controls.forEach(([ctrl, key]) => {
            return __form(f, key + "", ctrl)
        })
    }
}

function __form(f: HTMLFormElement, key: string, ctrl: FormControl<any> | FormArray<any> | FormGroup<any>) {
    if (ctrl instanceof FormGroup) return __formGroup(f, key as string, ctrl)
    else if (ctrl instanceof FormArray) return __formArray(f, key as string, ctrl)
    else return __formControl(f, key as string, ctrl)
}

function __formGroup(f: HTMLFormElement, key: string, schema: FormGroup<any>) {
    const _f = f.querySelector(`[name=${key as string}]`) as HTMLFormElement
    if (!_f) {
        throw new Error(`Couldn't find 'FormGroup' with name=${key as string}.`)
    }
    return form(_f, schema)
}

function __formArray(f: HTMLFormElement, key: string, schema: FormArray<any>) {
    const _f = f.querySelector(`[name=${key as string}]`) as HTMLFormElement
    if (!_f) {
        throw new Error(`Couldn't find 'FormArray' with name=${key as string}.`)
    }
    return form(_f, schema)
}

function __formControl(f: HTMLFormElement, key: string, ctrl: FormControl<any>) {
    const els = f.querySelectorAll(`[name=${key as string}]`) as unknown as HTMLInputElement[]
    if (els.length === 0) {
        throw new Error(`Couldn't find 'HTMLElement' with name=${key as string}.`)
    }
    for (const el of els) {
        formControl(el, ctrl)
    }
}

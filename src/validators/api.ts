import { FormControl } from "../modules"
import validator from "validator"
import type { IsFQDNOptions } from "validator/lib/isFQDN"

function createValidator<T>(fn: (ctrl: FormControl<T>) => string | undefined): () => (ctrl: FormControl<T>) => string | null;
function createValidator<T, Q, O = false>(fn: (ctrl: FormControl<T>, config: Q) => string | undefined):
    (O extends true ?
        ((config?: Q) => (ctrl: FormControl<T>) => string | null) :
        ((config: Q) => (ctrl: FormControl<T>) => string | null));
function createValidator(fn: any) {
    return (config?: unknown) => {
        return (ctrl: unknown) => {
            return fn(ctrl, config) || null
        }
    }
}

function _if(name: string | null, v = "value"): string {
    return name ? `\`${name}\`` : "`" + v + "`"
}

export const required = createValidator(({ value, name }) => {
    if (value === "" || value === undefined || value === null) {
        return `${_if(name)} is required.`
    }
})

export const minLength = createValidator<string, number>((ctrl, len) => {
    if (ctrl.value.length < len) {
        return `${_if(ctrl.name)} minLength is ${len}.`
    }
})

export const maxLength = createValidator<string, number>((ctrl, len) => {
    if (ctrl.value.length > len) {
        return `${_if(ctrl.name)} maxLength is ${len}.`
    }
})

export const min = createValidator<number, number>((ctrl, val) => {
    if (ctrl.value < val) {
        return `${_if(ctrl.name)} min value is ${val}.`
    }
})

export const max = createValidator<number, number>((ctrl, val) => {
    if (ctrl.value > val) {
        return `${_if(ctrl.name)} max value is ${val}.`
    }
})

export const isFQDN = createValidator<string, IsFQDNOptions, true>((ctrl, options) => {
    if (!validator.isFQDN(ctrl.value, options)) {
        return `${ctrl.value} is not a valid domain name.`
    }
})

export const isInt = createValidator<number, validator.IsIntOptions, true>((ctrl, options) => {
    if (!validator.isInt(ctrl.value.toString(), options)) {
        return `${_if(ctrl.name)} must be valid integer.`
    }
})

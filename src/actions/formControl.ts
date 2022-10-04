import type { FormControl } from "../modules"

export type Input = HTMLInputElement | HTMLSelectElement
export function formControl<T>(input: Input, ctrl: FormControl<T>) {
    ctrl.setName(input.name)

    input.onblur = () => {
        ctrl.markAsTouched()
        __setClassList(input, __createClassList(ctrl))
    }

    if (input instanceof HTMLSelectElement) __formControlSelect(input, ctrl)
    else if (input instanceof HTMLInputElement) __formControlInput(input, ctrl)

    return {
        destroy() {
            input.oninput = null
            input.onblur = null
            input.onchange = null
            ctrl.destroy()
        },
    }
}

function __formControlSelect<T>(
    input: HTMLSelectElement,
    ctrl: FormControl<T>
) {
    for (const option of input.options) {
        if (ctrl.value === null || ctrl.value === option.value) {
            option.selected = true
            break
        }
    }

    __setClassList(input, __createClassList(ctrl))

    input.onchange = () => {
        ctrl.markAsDirty()
        ctrl.setValue(input.options[input.options.selectedIndex].value as T)
        __setClassList(input, __createClassList(ctrl))
    }
}

function __formControlInput<T>(input: HTMLInputElement, ctrl: FormControl<T>) {
    if (input.type === "checkbox") {
        input.checked = ctrl.value as boolean
    } else if (input.type === "radio") {
        if (input.value === ctrl.value) {
            input.checked = true
        }
    } else {
        input.value = ctrl.value as string
    }

    __setClassList(input, __createClassList(ctrl))

    input.oninput = () => {
        ctrl.markAsDirty()
        if (input.type === "checkbox") {
            ctrl.setValue(input.checked as T)
        } else if (input.type == "number") {
            ctrl.setValue(+input.value as T)
        } else {
            ctrl.setValue(input.value as T)
        }
        __setClassList(input, __createClassList(ctrl))
    }
}

function __createClassList<T>(ctrl: FormControl<T>) {
    return {
        "srf-input": true,
        "srf-valid": ctrl.valid,
        "srf-invalid": ctrl.invalid,
        "srf-pending": ctrl.pending,
        "srf-touched": ctrl.touched,
        "srf-untouched": ctrl.untouched,
        "srf-dirty": ctrl.dirty,
        "srf-pristine": ctrl.pristine,
        "srf-error": ctrl.error !== null,
    }
}

function __setClassList(
    inp: HTMLElement,
    classList: { [key: string]: boolean }
) {
    for (const key in classList) {
        if (classList[key]) {
            if (!inp.classList.contains(key)) {
                inp.classList.add(key)
            }
        } else {
            if (inp.classList.contains(key)) {
                inp.classList.remove(key)
            }
        }
    }
}

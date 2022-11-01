import AbstractControl from "../internals/abstract_control";
import FormGroup from "../modules/form_group";
import FormArray from "../modules/form_array";
import FormControl from "../modules/form_control";

function form(el: Element, ctrl: AbstractControl<any, any>) {
    if (ctrl instanceof FormGroup) {
        return Object.keys(ctrl.controls).forEach((key) => {
            const _ctrl = ctrl.controls[key];
            const els = el.querySelectorAll(`[name="${key}"]`);
            for (const _el of els) {
                form(_el, _ctrl);
            }
        });
    }

    if (ctrl instanceof FormArray) {
        const ctrls = ctrl.controls as AbstractControl<any, any>[];
        ctrls.forEach((_ctrl) => {
            const els = el.querySelectorAll(`[name="${_ctrl.key}"]`);
            for (const _el of els) {
                form(_el, _ctrl);
            }
        });

        const unsubscribe = ctrl.onPush((ctrls) => {
            for (const ctrl of ctrls) {
                const els = el.querySelectorAll(`[name="${ctrl.key}"]`);
                console.log({ ctrl, els });

                for (const _el of els) {
                    form(_el, ctrl);
                }
            }
        });

        return {
            destroy: unsubscribe,
        };
    }

    if (ctrl instanceof FormControl) {
        const $ = el as HTMLInputElement | HTMLSelectElement;
        ctrl.input = $;

        $.onblur = () => {
            ctrl.markAsTouched();
        };

        if ($ instanceof HTMLSelectElement) __handleSelect($, ctrl);
        else if (
            $ instanceof HTMLTextAreaElement ||
            $ instanceof HTMLInputElement
        )
            __handleInput($, ctrl);

        return {
            destroy() {
                $.oninput = null;
                $.onblur = null;
                $.onchange = null;
                ctrl.destroy();
            },
        };
    }
}

function __handleSelect($: HTMLSelectElement, ctrl: FormControl<any>) {
    function setValue(value: any) {
        for (const option of $.options) {
            if (value === null || value === "" || value == option.value) {
                option.selected = true;
                break;
            }
        }
    }

    setValue(ctrl.value);

    $.onchange = () => {
        ctrl.markAsDirty();
        ctrl.setValue($.options[$.options.selectedIndex].value);
        setValue(ctrl.value);
    };
}

function __handleInput($: HTMLInputElement, ctrl: FormControl<any>) {
    function setValue(value: any) {
        if ($.type === "checkbox") {
            $.checked = value as boolean;
        } else if ($.type === "radio") {
            if ($.value === value) {
                $.checked = true;
            }
        } else {
            $.value = value as string;
        }
    }

    setValue(ctrl.value);

    $.oninput = () => {
        ctrl.markAsDirty();
        if ($.type === "checkbox") {
            ctrl.setValue($.checked);
        } else if ($.type == "number") {
            ctrl.setValue(+$.value);
        } else {
            ctrl.setValue($.value);
        }
        setValue(ctrl.value);
    };
}

export { form as default };

import { ControlValue, ExtractArrayData, FormArrayExtends, FormGroupValue, RxArray, RxArrayData } from "../types"
import { AbstractControl } from "./AbstractControl"


export class FormArray<T extends FormArrayExtends> extends AbstractControl<FormGroupValue<[ControlValue<T>, number][]>> {
    private __controls: RxArray<T>
    public get controls(): RxArrayData<T> {
        return this.__controls.items
    }


    public get value(): [ControlValue<T>, number][] {
        return this.controls.map(([ctrl, key]) => {
            return [{
                value: ctrl.value,
                dirty: ctrl.dirty,
                invalid: ctrl.invalid,
                pending: ctrl.pending,
                pristine: ctrl.pristine,
                error: "error" in ctrl ? ctrl.error : undefined,
                touched: ctrl.touched,
                untouched: ctrl.untouched,
                valid: ctrl.valid
            }, key]
        })
    }

    constructor(data: T) {
        super()
        this.__controls = new RxArray<T>(data)
    }

    public override get valid(): boolean {
        return this.controls.every(([ctrl]) => ctrl.valid)
    }

    public override get invalid(): boolean {
        return !this.pending && !this.valid
    }

    public override get pending(): boolean {
        return this.controls.some(([ctrl]) => ctrl.pending)
    }

    public override get touched(): boolean {
        return this.controls.some(([ctrl]) => ctrl.touched)
    }

    public override get untouched(): boolean {
        return this.controls.every(([ctrl]) => ctrl.untouched)
    }

    public override get dirty(): boolean {
        return this.controls.some(([ctrl]) => ctrl.dirty)
    }

    public get(index: number): ExtractArrayData<T> | undefined {
        const [item] = this.controls.filter(([_, idx]) => idx === index)
        if (!item) return
        return item[0]
    }

    public getValue(): FormGroupValue<[ControlValue<T>, number][]> {
        return {
            value: this.value,
            dirty: this.dirty,
            invalid: this.invalid,
            pending: this.pending,
            pristine: this.pristine,
            touched: this.touched,
            untouched: this.untouched,
            valid: this.valid,
        }
    }

    public reset(): void {
        for (const [ctrl] of this.controls) {
            ctrl.reset()
        }
    }

    public override destroy(): void {
        super.destroy()
        this.controls.forEach(([ctrl]) => ctrl.destroy())
        this.root?.destroy()
    }
}

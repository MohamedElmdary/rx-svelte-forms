import { ControlValue, ExtractArrayData, FormArrayExtends, FormGroupValue, RxArray, RxArrayData } from "../types"
import { AbstractControl } from "./AbstractControl"
import type { FormGroup } from "./FormGroup"


type __ExtractInternalType<T> =
    T extends Array<infer R> ?
        R extends Array<any> ?
            __ExtractInternalType<R> :
            R extends FormGroup<infer G> ?
                G :
                R extends FormArray<infer G> ?
                __ExtractInternalType<G> :
                R :
                T;

export class FormArray<T extends FormArrayExtends> extends AbstractControl<FormGroupValue<[ControlValue<__ExtractInternalType<T>>, number][]>> {
    private __controls: RxArray<T>
    public get controls(): RxArrayData<T> {
        return this.__controls.items
    }


    public get value(): [ControlValue<__ExtractInternalType<T>>, number][] {
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
        this.controls.forEach(([ctrl]) => ctrl.setRoot(this as any))
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

    public getValue(): FormGroupValue<[ControlValue<__ExtractInternalType<T>>, number][]> {
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

    public push(...items: T) {
        const out = this.__controls.push(items)
        this.notify()
        return out
    }

    public removetAt(index: number) {
        const item = this.__controls.removeAt(index)
        if (item) this.notify()
        return item
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

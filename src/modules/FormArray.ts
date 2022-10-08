import { FormArrayExtends, RxArray, RxArrayData } from "../types"
import { AbstractControl } from "./AbstractControl"

export class FormArray<T extends FormArrayExtends> extends AbstractControl<T> {
    private __controls: RxArray<T>
    public get controls(): RxArrayData<T> {
        return this.__controls.items
    }

    public get value() {
        return null
    }

    constructor(data: T) {
        super()
        this.__controls = new RxArray<T>(data)
    }

    public getValue(): T {
        throw new Error("Method not implemented.")
    }

    public reset(): void {
        throw new Error("Method not implemented.")
    }

}

import { AbstractControl } from "./AbstractControl"
import { FormGroupValue, FormGroupConfig, GetValue, GroupValue, FullGroupValue } from "../types"

export class FormGroup<T extends object> extends AbstractControl<FormGroupValue<FullGroupValue<T>>> {
    private __controls: FormGroupConfig<T>
    public get controls(): FormGroupConfig<T> {
        return this.__controls
    }

    public get keys(): Array<keyof T> {
        return Object.keys(this.__controls) as Array<keyof T>
    }

    public get value(): GroupValue<T> {
        return this
            .keys
            .reduce((out, key) => {
                out[key as unknown as string] = this.get(key).value
                return out
            }, {} as { [key: string]: unknown }) as GroupValue<T>
    }

    constructor(controls: FormGroupConfig<T>) {
        super()
        this.__controls = controls
        this.keys.forEach(k => this.get(k).setRoot(this as unknown as FormGroup<object>))
    }

    public get<K extends keyof T = keyof T>(key: K): GetValue<T, K> {
        return this.__controls[key] as GetValue<T, K>
    }

    public override get valid(): boolean {
        return this.keys.every((key) => this.get(key).valid)
    }

    public override get invalid(): boolean {
        return !this.pending && !this.valid
    }

    public override get pending(): boolean {
        return this.keys.some((key) => this.get(key).pending)
    }

    public override get touched(): boolean {
        return this.keys.some((key) => this.get(key).touched)
    }

    public override get untouched(): boolean {
        return this.keys.every((key) => this.get(key).untouched)
    }

    public override get dirty(): boolean {
        return this.keys.some((key) => this.get(key).dirty)
    }

    public get fullValue(): FullGroupValue<T> {
        return this.keys.reduce((value, key) => {
            value[key as unknown as string] = this.get(key).getValue()
            return value
        }, {} as {[key: string]: unknown}) as FullGroupValue<T>
    }

    public getValue(): FormGroupValue<FullGroupValue<T>> {
        return {
            value: this.fullValue,
            valid: this.valid,
            invalid: this.invalid,
            dirty: this.dirty,
            pending: this.pending,
            pristine: this.pristine,
            touched: this.touched,
            untouched: this.untouched
        }
    }

    public override reset(): void {
        this.keys.forEach(k => this.get(k).reset())
    }

    public override destroy(): void {
        super.destroy()
        this.keys.forEach((key) => this.get(key).destroy())
    }
}

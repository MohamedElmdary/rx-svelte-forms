import AbstractControl from "../internals/abstract_control";
import { ExtractFormValue, FormResult } from "../types";

class FormArray<T extends AbstractControl<any, any>[]> extends AbstractControl<
    ExtractFormValue<T>,
    T
> {
    private __index: number;
    private __controls: T;
    get controls(): T {
        return this.__controls;
    }

    get value(): FormResult<T> {
        return this.controls.map((ctrl) => ctrl.value) as FormResult<T>;
    }

    public get valid(): boolean {
        return this.controls.reduce((valid, ctrl) => {
            return valid && ctrl.valid;
        }, true);
    }

    public get pending(): boolean {
        return this.controls.reduce((pending, ctrl) => {
            return pending || ctrl.pending;
        }, false);
    }

    public get touched(): boolean {
        return this.controls.reduce((touched, ctrl) => {
            return touched || ctrl.touched;
        }, false);
    }

    public get dirty(): boolean {
        return this.controls.reduce((dirty, ctrl) => {
            return dirty || ctrl.dirty;
        }, false);
    }

    constructor(controls: T) {
        super();
        this.__index = 0;
        this.__controls = controls.map((ctrl) => {
            ctrl.key = this.__index++;
            ctrl.root = this;
            return ctrl;
        }) as T;
    }

    public get(key: number): (T extends Array<infer Q> ? Q : T) | undefined {
        return this.controls.find((ctrl) => ctrl.key === key) as any;
    }

    public markAsTouched(): void {
        this.__controls.forEach((ctrl) => ctrl.markAsTouched());
    }
    public markAsDirty(): void {
        this.__controls.forEach((ctrl) => ctrl.markAsDirty());
    }
    public validate(): void {
        this.__controls.forEach((ctrl) => ctrl.validate());
    }

    public getValue(): ExtractFormValue<T> {
        return {
            value: this.controls.map((ctrl) => ctrl.getValue()),
            valid: this.valid,
            invalid: this.invalid,
            pending: this.pending,
            touched: this.touched,
            untouched: this.untouched,
            dirty: this.dirty,
            pristine: this.pristine,
        } as ExtractFormValue<T>;
    }

    public reset(): void {
        this.controls.forEach((ctrl) => ctrl.reset());
    }

    public override destroy(): void {
        super.destroy();
        this.controls.forEach((ctrl) => ctrl.destroy());
    }
}

export { FormArray as default };

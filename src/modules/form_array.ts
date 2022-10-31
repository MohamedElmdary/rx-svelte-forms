import AbstractControl from "../internals/abstract_control";
import { ExtractFormValue, FormResult } from "../types";
import { Unsubscriber } from "../internals/rx_store";

type OnPush = (ctrls: AbstractControl<any, any>[]) => void;

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

    private __onPush: Set<OnPush>;
    public onPush(fn: OnPush): Unsubscriber {
        this.__onPush.add(fn);
        return () => {
            this.__onPush.delete(fn);
        };
    }

    constructor(controls: T) {
        super();
        this.__index = 0;
        this.__controls = controls;
        for (const ctrl of controls) {
            ctrl.key = this.__index++;
            ctrl.root = this;
        }
        this.__onPush = new Set<OnPush>();
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
            controls: this.controls,
        } as ExtractFormValue<T>;
    }

    public setDisabled(value: boolean): void {
        this.controls.forEach((ctrl) => ctrl.setDisabled(value));
    }

    public reset(): void {
        this.controls.forEach((ctrl) => ctrl.reset());
    }

    public override destroy(): void {
        super.destroy();
        this.controls.forEach((ctrl) => ctrl.destroy());
        this.__onPush.clear();
    }

    public push(...ctrls: T) {
        for (const ctrl of ctrls) {
            ctrl.key = this.__index++;
            ctrl.root = this;
            this.__controls.push(ctrl);
        }
        /* delay to next tick */
        requestAnimationFrame(() => {
            this.__onPush.forEach((fn) => fn(ctrls));
            this.notifyListeners();
        });
        return this.__index - 1;
    }

    public removeAt(index: number): boolean {
        const idx = this.__controls.findIndex((ctrl) => ctrl.key === index);
        if (idx === -1) return false;
        const [ctrl] = this.__controls.splice(idx, 1);
        ctrl.destroy();
        this.notifyListeners();
        return true;
    }
}

export { FormArray as default, OnPush };

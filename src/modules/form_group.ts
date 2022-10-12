import AbstractControl from "internals/abstract_control";
import { ExtractFormValue, FormResult } from "../types";

class FormGroup<T extends object> extends AbstractControl<
    ExtractFormValue<T>,
    T
> {
    private __controls: T;
    get controls(): T {
        return this.__controls;
    }

    public get value(): FormResult<T> {
        return this.__reduce((out, key, ctrl) => {
            out[key] = ctrl.value;
            return out;
        });
    }

    public get<K extends keyof T = keyof T>(key: K): T[K] {
        return this.__controls[key];
    }

    public get valid(): boolean {
        return this.__reduce((out, _, ctrl) => {
            return out && ctrl.valid;
        }, true);
    }

    public get pending(): boolean {
        return this.__reduce((out, _, ctrl) => {
            return out || ctrl.pending;
        }, false);
    }

    public get touched(): boolean {
        return this.__reduce((out, _, ctrl) => {
            return out || ctrl.touched;
        }, false);
    }

    public get dirty(): boolean {
        return this.__reduce((out, _, ctrl) => {
            return out || ctrl.dirty;
        }, false);
    }

    constructor(controls: T) {
        super();
        this.__controls = Object.keys(controls).reduce((ctrls, key) => {
            const ctrl = (<any>controls)[key] as AbstractControl<any, any>;
            ctrl.root = this;
            return ctrls;
        }, {} as T);
    }

    public markAsTouched(): void {
        Object.keys(this.__controls).forEach((key) => {
            (<any>this.__controls)[key].markAsTouched();
        });
    }

    public markAsDirty(): void {
        Object.keys(this.__controls).forEach((key) => {
            (<any>this.__controls)[key].markAsDirty();
        });
    }

    public validate(): void {
        Object.keys(this.__controls).forEach((key) => {
            (<any>this.__controls)[key].validate();
        });
    }

    public getValue(): ExtractFormValue<T> {
        return {
            value: this.__reduce((out, key, ctrl) => {
                out[key] = ctrl.getValue();
                return out;
            }),
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
        Object.keys(this.__controls).forEach((key) => {
            (<any>this.__controls)[key].reset();
        });
    }

    public override destroy(): void {
        super.destroy();
        Object.keys(this.__controls).forEach((key) => {
            (<any>this.__controls)[key].destroy();
        });
    }

    private __reduce<R = any>(
        cb: (out: any, key: string, ctrl: AbstractControl<any, any>) => R,
        init?: R
    ): R {
        return Object.keys(this.__controls).reduce((out, key) => {
            return cb(out, key, (<any>this.__controls)[key]);
        }, init || ({} as R)) as R;
    }
}

export { FormGroup as default };

import RxStore from "./rx_store";
import { FormResult } from "../types";

enum Status {
    valid = "VALID",
    invalid = "INVALID",
    pending = "PENDING",
}

abstract class AbstractControl<T, V, C = any> extends RxStore<T> {
    public key?: number;
    public root?: AbstractControl<any, any>;

    public abstract get value(): FormResult<V>;
    public abstract get pending(): boolean;

    public abstract get valid(): boolean;
    public get invalid(): boolean {
        return !this.valid;
    }

    public abstract get touched(): boolean;
    public get untouched(): boolean {
        return !this.touched;
    }

    public abstract get dirty(): boolean;
    public get pristine(): boolean {
        return !this.dirty;
    }

    public abstract markAsTouched(): void;
    public abstract markAsDirty(): void;
    public abstract validate(ctx?: C): void;
    public abstract setDisabled(value: boolean): void;
    public abstract reset(ctx?: C): void;

    public override notifyListeners(): void {
        super.notifyListeners();
        this.root?.notifyListeners();
    }
}

export { AbstractControl as default, Status };

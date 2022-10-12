import RxStore from "./rx_store";

enum Status {
    valid = "VALID",
    invalid = "INVALID",
    pending = "PENDING",
}

abstract class AbstractControl<T> extends RxStore<T> {
    public root?: AbstractControl<T>;

    public abstract get valid(): boolean;
    public abstract get invalid(): boolean;
    public abstract get pending(): boolean;
    public abstract get touched(): boolean;
    public abstract get untouched(): boolean;
    public abstract get dirty(): boolean;
    public abstract get pristine(): boolean;

    public abstract markAsTouched(): void;
    public abstract markAsDirty(): void;
    public abstract validate(): void;
}

export { AbstractControl as default, Status };

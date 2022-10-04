import { Status, Subscriber } from "../types"
import { FormGroup } from "./FormGroup"

export abstract class AbstractControl<S> {
    protected __subscribers: Set<Subscriber<S>>

    protected __root: FormGroup<object> | null = null
    public get root(): FormGroup<object> | null {
        return this.__root
    }
    public setRoot(group: FormGroup<object>): void {
        this.__root = group
        this.root?.notify()
    }

    protected __status: Status
    public get status(): Status {
        return this.__status
    }
    public get valid(): boolean {
        return this.__status === Status.VALID
    }
    public get invalid(): boolean {
        return this.__status === Status.INVALID
    }
    public get pending(): boolean {
        return this.__status === Status.PENDING
    }

    protected __touched: boolean
    public get touched(): boolean {
        return this.__touched
    }
    public get untouched(): boolean {
        return !this.__touched
    }

    protected __dirty: boolean
    public get dirty(): boolean {
        return this.__dirty
    }
    public get pristine(): boolean {
        return !this.__dirty
    }

    constructor() {
        this.__subscribers = new Set<Subscriber<S>>()
        this.__status = Status.PENDING
        this.__touched = false
        this.__dirty = false
    }

    public markAsTouched(): void {
        if (!this.__touched) {
            this.__touched = true
            this.notify()
        }
    }

    public markAsDirty(): void {
        if (!this.__dirty) {
            this.__dirty = true
            this.notify()
        }
    }

    public subscribe(fn: Subscriber<S>): () => void {
        fn(this.getValue())
        this.__subscribers.add(fn)
        return () => {
            this.__subscribers.delete(fn)
        }
    }

    public abstract getValue(): S;
    public abstract reset(): void;

    public notify(): void {
        this.__subscribers.forEach(fn => fn(this.getValue()))
        this.root?.notify()
    }

    public destroy(): void {
        this.__subscribers.clear()
    }
}

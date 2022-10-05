import { AbstractControl } from "./AbstractControl"
import { Status, Validator, AsyncValidator, ControlValue } from "../types"

export class FormControl<T> extends AbstractControl<ControlValue<T>> {
    private __error?: string
    public get error(): string | undefined {
        return this.__error
    }

    private __name: string | null
    public get name(): string | null {
        return this.__name
    }
    public setName(name: string): void {
        this.__name = name
    }

    private __value: T
    public get value(): T {
        return this.__value
    }

    public setError(error?: string): void {
        this.__error = error
        this.__status = error ? Status.INVALID : Status.VALID
        this.notify()
    }

    private readonly __defaultValue: T
    public get defaultValue(): T {
        return this.__defaultValue
    }

    private readonly __defaultValidators: Validator<T>[]
    private readonly __defaultAsyncValidators: AsyncValidator<T>[]
    private __validators: Validator<T>[]
    private __asyncValidators: AsyncValidator<T>[]

    constructor(
        value: T,
        valiators?: Validator<T>[],
        asyncValidators?: AsyncValidator<T>[]
    ) {
        super()
        this.__defaultValue = value
        this.__value = value
        this.__defaultValidators = valiators|| []
        this.__validators = [...this.__defaultValidators]
        this.__defaultAsyncValidators = asyncValidators || []
        this.__asyncValidators = [...this.__defaultAsyncValidators]
        this.__name = null

        this.validate()
    }

    public addValiadtors(valiators: Validator<T>[]): void {
        this.__validators.push(...valiators)
        this.validate()
    }

    public addAsyncValidators(asyncValidators: AsyncValidator<T>[]): void {
        this.__asyncValidators.push(...asyncValidators)
        this.validate()
    }

    public removeValidator(validator: Validator<T>): void {
        this.__validators = this.__validators.filter((fn) => fn !== validator)
        this.validate()
    }

    public removeAsyncValidator(asyncValidator: AsyncValidator<T>): void {
        this.__asyncValidators = this.__asyncValidators.filter((fn) => fn !== asyncValidator)
        this.validate()
    }

    public getValue(): ControlValue<T> {
        return {
            value: this.value,
            valid: this.valid,
            invalid: this.invalid,
            dirty: this.dirty,
            error: this.error,
            pending: this.pending,
            pristine: this.pristine,
            touched: this.touched,
            untouched: this.untouched
        }
    }

    public setValue(value: T): void {
        this.__value = value
        this.validate()
    }

    public async validate(): Promise<void> {
        this.__status = Status.PENDING
        this.notify()

        for (const validators of [this.__validators, this.__asyncValidators]) {
            for (const valiator of validators) {
                const error = await valiator(this)
                if (error !== undefined) {
                    return this.setError(error)
                }
            }
        }

        this.setError()
    }

    public override reset(): void {
        this.__value = this.__defaultValue
        this.__validators = [...this.__defaultValidators]
        this.__asyncValidators = [...this.__defaultAsyncValidators]
        this.__touched = false
        this.__dirty = false
        this.__error = undefined

        this.validate()
    }
}

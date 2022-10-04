export type Subscriber<T> = (value: T) => void;
export enum Status {
    VALID = "VALID",
    INVALID = "INVALID",
    PENDING = "PENDING"
}

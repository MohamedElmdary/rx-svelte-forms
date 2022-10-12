type RxStoreListener<T> = (value: T) => void;
type Unsubscriber = () => void;

abstract class RxStore<T> {
    private __destroied = false;
    private __listeners = new Set<RxStoreListener<T>>();

    public abstract getValue(): T;

    public subscribe(listener: RxStoreListener<T>): Unsubscriber {
        if (!this.__destroied) {
            this.__listeners.add(listener);
            listener(this.getValue());
        }
        return () => {
            this.__listeners.delete(listener);
        };
    }

    public destroy(): void {
        this.__destroied = true;
        this.__listeners.clear();
    }

    protected _notifyListeners(): void {
        const value = this.getValue();
        for (const listener of this.__listeners) {
            listener(value);
        }
    }
}

export { RxStore as default, RxStoreListener, Unsubscriber };

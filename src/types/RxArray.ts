export type ExtractArrayData<T> = T extends Array<infer Q> ? Q : T;
export type RxArrayData<T extends Array<any>> = [ExtractArrayData<T>, number][];

export class RxArray<T extends Array<any>> {
    private __data: T;
    private __removed: Set<number>;

    public get items(): RxArrayData<T> {
        const items: RxArrayData<T> = []
        for (let i = 0; i < this.__data.length; i++) {
            if (this.__removed.has(i)) {
                items.push([this.__data[i], i])
            }
        }
        return items
    }

    public get length(): number {
        return this.__data.length - this.__removed.size
    }

    constructor(data: T) {
        this.__data = data
        this.__removed = new Set<number>()
    }

    public push(items: T): RxArrayData<T> {
        return items.map((item) => {
            return [item, this.__data.push(item)]
        })
    }

    public removeAt(index: number): ExtractArrayData<T> | undefined {
        const { __data: d, __removed: r } = this
        if (d.length <= index || r.has(index)) return
        this.__removed.add(index)
        return this.__data[index]
    }
}

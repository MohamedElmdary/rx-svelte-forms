function merge<T extends object>(o1: T, o2: T): T {
    return { ...o1, ...o2 };
}

function toString(value?: any): string {
    return value?.toString() ?? "";
}

export default {
    merge,
    toString,
};

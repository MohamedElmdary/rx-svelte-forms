function merge<T extends object>(o1: T, o2: T): T {
    return { ...o1, ...o2 };
}

export default {
    merge,
};

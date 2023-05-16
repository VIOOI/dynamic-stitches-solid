export const and = (...args) => args.every(Boolean);
export const or = (...args) => args.some(Boolean);
export const not = (arg) => !arg;
export const xor = (...args) => args.filter(Boolean).length % 2 !== 0;
export const implies = (first, ...rest) => !first || rest.every(Boolean);
export const equivalent = (...args) => {
    const first = args[0];
    return args.every(arg => arg === first);
};

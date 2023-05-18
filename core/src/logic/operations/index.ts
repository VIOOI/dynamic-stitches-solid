export const and = (...args: boolean[]): boolean => args.every(Boolean);
export const or = (...args: boolean[]): boolean => args.some(Boolean);
export const not = (arg: boolean): boolean => !arg;
export const xor = (...args: boolean[]): boolean => args.filter(Boolean).length % 2 !== 0;
export const implies = (first: boolean, ...rest: boolean[]): boolean => !first || rest.every(Boolean);
export const equivalent = (...args: boolean[]): boolean => {
	const first = args[0];
	return args.every(arg => arg === first);
};

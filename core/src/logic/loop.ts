import { CSSProperties } from "@stitches/core";

type Formatter = (name: string, index: number, context: any) => string;
type CssGenerator = (index: number, count: number, context: any) => CSSProperties;
type Context = Record<string, any>;

type LoopArgs = {
	count: number,
	name: string,
	css: CssGenerator | CSSProperties,
	context?: Context,
	formatter?: Formatter,
}

export function loop(args: LoopArgs): CSSProperties;
export function loop(
	count: number,
	name: string,
	css: CssGenerator | CSSProperties,
	context?: Context,
	formatter?: Formatter,
): CSSProperties;
export function loop(
	countOrArgs: number | LoopArgs,
	name?: string,
	css?: CssGenerator | CSSProperties,
	context: Context = {},
	formatter: Formatter = (base, index, context) => `& .${base}-${index + 1}`,
): CSSProperties {
	let count: number;
	if (typeof countOrArgs === "number") {
		count = countOrArgs;
	} else {
		({ count, name, css, context, formatter } = countOrArgs);
		context = context || {};
		formatter = formatter || ((base, index, context) => `& .${base}-${index + 1}`);
	}

	return Array.from({ length: count }).reduce((res, _, i) => {
		const cssProperties = typeof css === "function" ? css(i, count, context) : css;
		res[formatter(name, i, context)] = { ...cssProperties };
		return res;
	}, {} as CSSProperties);
};

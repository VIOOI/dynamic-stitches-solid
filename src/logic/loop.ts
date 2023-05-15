import { CSSProperties } from "@stitches/core";

type Formatter = (baseName: string, index: number, context: any) => string;
type CssGenerator = (index: number, count: number, context: any) => CSSProperties;
type Context = Record<string, any>;

export const loop = (
	count: number,
	baseName: string,
	css: CssGenerator | CSSProperties,
	context: Context = {},
	formatter: Formatter = (base, index, context) => `& .${base}-${index + 1}`,
): CSSProperties => {
	return Array.from({ length: count }).reduce((res, _, i) => {
		const cssProperties = typeof css === "function" ? css(i, count, context) : css;
		res[formatter(baseName, i, context)] = { ...cssProperties };
		return res;
	}, {} as CSSProperties);
};

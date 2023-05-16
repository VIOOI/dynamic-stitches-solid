import { CSSProperties } from "@stitches/core";
type Formatter = (name: string, index: number, context: any) => string;
type CssGenerator = (index: number, count: number, context: any) => CSSProperties;
type Context = Record<string, any>;
type LoopArgs = {
    count: number;
    name: string;
    css: CssGenerator | CSSProperties;
    context?: Context;
    formatter?: Formatter;
};
export declare function loop(args: LoopArgs): CSSProperties;
export declare function loop(count: number, name: string, css: CssGenerator | CSSProperties, context?: Context, formatter?: Formatter): CSSProperties;
export {};

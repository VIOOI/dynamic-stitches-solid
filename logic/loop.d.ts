import { CSSProperties } from "@stitches/core";
type Formatter = (baseName: string, index: number, context: any) => string;
type CssGenerator = (index: number, count: number, context: any) => CSSProperties;
type Context = Record<string, any>;
export declare const loop: (count: number, baseName: string, css: CssGenerator | CSSProperties, context?: Context, formatter?: Formatter) => CSSProperties;
export {};

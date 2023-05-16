import { CSSProperties, css } from "@stitches/core";
import { Accessor } from "solid-js";
export declare function removeStyles(styleId: string): void;
type ReturnHook = Accessor<string & {
    className: string;
    selector: string;
    props: {};
}>;
export declare function createStyledHook<T extends Record<string, unknown>>(cssf: typeof css, cssParams: (props: T) => CSSProperties): (props: T) => ReturnHook;
export {};

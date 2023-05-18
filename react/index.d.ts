import { css, CSSProperties } from "@stitches/core";
type StyledHookReturnType = {
    className: string;
    selector: string;
    props: {};
};
declare const createStyledHook: <T extends Record<string, unknown>>(cssFunction: typeof css, cssParams: (props: T) => CSSProperties) => (props: T) => StyledHookReturnType;
export { createStyledHook };

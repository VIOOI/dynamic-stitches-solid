import { css, CSSProperties } from '@stitches/core';
import { Accessor } from 'solid-js';

declare function removeStyles(styleId: string): void;
type ReturnHook = Accessor<string & {
    className: string;
    selector: string;
    props: {};
}>;
declare function createStyledHook<T extends Record<string, unknown>>(cssf: typeof css, cssParams: (props: T) => CSSProperties): (props: T) => ReturnHook;

export { createStyledHook, removeStyles };

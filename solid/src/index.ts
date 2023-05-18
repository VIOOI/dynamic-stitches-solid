/* eslint-disable @typescript-eslint/ban-types */
import { css, CSSProperties } from "@stitches/core";
import { Accessor, createEffect, createSignal } from "solid-js";

// Use a map to store created styles for quick access and replacement
const stylesMap: Map<string, CSSRule> = new Map();

export function createStyledHook<T extends Record<string, unknown>>(cssf: typeof css, cssParams: (props: T) => CSSProperties) {
	return function useStyled(props: T): Accessor<string & {
		className: string;
		selector: string;
		props: {};
	}> {
		const [styleSignal, setStyleSignal] = createSignal(cssf({})());

		createEffect(() => {
			const style = cssf({
				...cssParams(props),
			});

			const existingStyle = stylesMap.get(style.className);
			if (existingStyle)
				existingStyle.deleteRule(existingStyle.selectorText);

			style.insertRule(style.cssText);

			stylesMap.set(style.className, style);

			setStyleSignal(style());
		});

		return styleSignal;
	};
}

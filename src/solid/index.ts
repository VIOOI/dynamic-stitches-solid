/* eslint-disable @typescript-eslint/ban-types */
import { CSSProperties, css } from "@stitches/core";
import { StyledComponentProps, StyledComponentType } from "@stitches/core/types/styled-component";
import { Accessor, createEffect, createSignal } from "solid-js";

let styleElements: NodeListOf<HTMLStyleElement> | null = null;
const getStyleElements = () => styleElements ??= document.querySelectorAll("style[data-stitches]");
const ruleContainsStyleId = (rule: CSSRule, styleId: string) => rule.cssText.includes(styleId);

export function removeStyles(styleId: string) {
	const styleElements = getStyleElements();

	styleElements.forEach((styleElement) => {
		const cssRules = Array.from(styleElement.sheet?.cssRules || []);
		const newRules = cssRules.filter(rule => !ruleContainsStyleId(rule, styleId));
		newRules.forEach(rule => {
			styleElement.sheet?.insertRule(rule.cssText);
		});
	});
}

type ReturnHook = Accessor<string & {
	className: string;
	selector: string;
	props: {};
}> 
export function createStyledHook<T extends Record<string, unknown>>(cssf: typeof css, cssParams: (props: T) => CSSProperties) {
	return function useStyled(props: T): ReturnHook {
		const [ styleSignal, setStyleSignal ] = createSignal(cssf({})());
		createEffect(() => {
			const style = cssf({
				...cssParams(props),
			});
			removeStyles(style.className);
			setStyleSignal(style());
		});
		return styleSignal;
	};
}

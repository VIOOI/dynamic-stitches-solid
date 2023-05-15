import { createEffect, createSignal } from "solid-js";
let styleElements = null;
const getStyleElements = () => styleElements ??= document.querySelectorAll("style[data-stitches]");
const ruleContainsStyleId = (rule, styleId) => rule.cssText.includes(styleId);
export function removeStyles(styleId) {
    const styleElements = getStyleElements();
    styleElements.forEach((styleElement) => {
        const cssRules = Array.from(styleElement.sheet?.cssRules || []);
        const newRules = cssRules.filter(rule => !ruleContainsStyleId(rule, styleId));
        newRules.forEach(rule => {
            styleElement.sheet?.insertRule(rule.cssText);
        });
    });
}
export function createStyledHook(cssf, cssParams) {
    return function useStyled(props) {
        const [styleSignal, setStyleSignal] = createSignal(cssf({})());
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

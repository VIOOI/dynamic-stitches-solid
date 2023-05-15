import { isUnitReturn, resolveCase, toValue } from "./utils";
export const switcher = (inputValue, cases, defaultCase) => {
    const value = toValue(inputValue);
    const result = cases.find(([predicate]) => predicate(value))?.[1]
        ?? defaultCase;
    const resolvedResult = resolveCase(result);
    return isUnitReturn(resolvedResult)
        ? resolvedResult[Symbol.toPrimitive]("string")
        : resolvedResult;
};

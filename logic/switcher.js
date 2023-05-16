import { isUnitReturn, resolveCase, toValue } from "./utils";
export function switcher(inputOrArgs, cases, onDeafult = undefined) {
    let input;
    if (typeof inputOrArgs === "object" && !(inputOrArgs instanceof UnitReturn)) {
        ({ input, cases, onDeafult } = inputOrArgs);
    }
    else {
        input = inputOrArgs;
    }
    const value = toValue(input);
    const result = cases.find(([predicate]) => predicate(value))?.[1]
        ?? onDeafult;
    const resolvedResult = resolveCase(result);
    return isUnitReturn(resolvedResult)
        ? resolvedResult[Symbol.toPrimitive]("string")
        : resolvedResult;
}
;

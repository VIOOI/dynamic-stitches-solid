import { isUnitReturn, resolveCase, toValue } from "./utils";
function isSwitcherArgs(arg) {
    return arg && typeof arg === 'object' && 'input' in arg && 'cases' in arg;
}
export function switcher(inputOrArgs, cases, onDeafult = undefined) {
    let input;
    if (isSwitcherArgs(inputOrArgs)) {
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

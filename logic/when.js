import { isUnitReturn, resolveCase } from "./utils";
export function when(conditionOrArgs, onTrue, onFalse) {
    const { condition, onTrue: resolvedTrue, onFalse: resolvedFalse } = typeof conditionOrArgs === "boolean"
        ? { condition: conditionOrArgs, onTrue, onFalse }
        : conditionOrArgs;
    if (resolvedTrue === undefined || resolvedFalse === undefined) {
        throw new Error("Invalid arguments");
    }
    const resolvedCase = condition ? resolveCase(resolvedTrue) : resolveCase(resolvedFalse);
    return isUnitReturn(resolvedCase) ? String(resolvedCase) : resolvedCase;
}

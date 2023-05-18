import { isUnitReturn, resolveCase } from "./utils";

type CaseWhen<T> = T | (() => T);

type WhenArgs<T> = {
    condition: boolean,
    onTrue: CaseWhen<T>,
    onFalse: CaseWhen<T>,
}

export function when<T>(args: WhenArgs<T>): T;
export function when<T>(condition: boolean, onTrue: CaseWhen<T>, onFalse: CaseWhen<T>): T;
export function when<T>(conditionOrArgs: boolean | WhenArgs<T>, onTrue?: CaseWhen<T>, onFalse?: CaseWhen<T>): string | T {
	const { condition, onTrue: resolvedTrue, onFalse: resolvedFalse } = 
		typeof conditionOrArgs === "boolean"
			? { condition: conditionOrArgs, onTrue, onFalse }
			: conditionOrArgs;

	if (resolvedTrue === undefined || resolvedFalse === undefined) {
		throw new Error("Invalid arguments");
	}

	const resolvedCase = condition ? resolveCase(resolvedTrue) : resolveCase(resolvedFalse);

	return isUnitReturn(resolvedCase) ? String(resolvedCase) : resolvedCase;
}

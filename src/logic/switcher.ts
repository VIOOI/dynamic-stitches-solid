import { UnitReturn } from "../unit/unit";
import { isUnitReturn, resolveCase, toValue } from "./utils";

type CaseSwitch<T> = [(val: string | number) => boolean, T | (() => T)];
type InputValue = string | number | UnitReturn;

type SwitcherArgs<T> = {
	input: InputValue,
	cases: CaseSwitch<T>[],
	onDeafult?: T | (() => T),
}

function isSwitcherArgs<T>(arg: any): arg is SwitcherArgs<T> {
	return arg && typeof arg === 'object' && 'input' in arg && 'cases' in arg;
}

export function switcher<T>(args: SwitcherArgs<T>): string | T;
export function switcher<T>(
	input: InputValue,
	cases: CaseSwitch<T>[],
	onDeafult?: T | (() => T),
): string | T;
export function switcher<T>(
	inputOrArgs: InputValue | SwitcherArgs<T>,
	cases?: CaseSwitch<T>[],
	onDeafult: T | (() => T) = undefined,
): string | T {
	let input: InputValue;
	if (isSwitcherArgs(inputOrArgs)) {
		({ input, cases, onDeafult } = inputOrArgs);
	} else {
		input = inputOrArgs;
	}

	const value = toValue(input);
	const result = cases.find(([ predicate ]) => predicate(value))?.[1] 
    ?? onDeafult;

	const resolvedResult = resolveCase(result);

	return isUnitReturn(resolvedResult) 
		? resolvedResult[Symbol.toPrimitive]("string") 
		: resolvedResult;
};

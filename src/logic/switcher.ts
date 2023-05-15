import { UnitReturn } from "../unit/unit";
import { isUnitReturn, resolveCase, toValue } from "./utils";

type CaseSwitch<T> = [(val: string | number) => boolean, T | (() => T)];
type InputValue = string | number | UnitReturn;

export const switcher = <T>(
	inputValue: InputValue,
	cases: CaseSwitch<T>[],
	defaultCase?: T | (() => T),
) => {
	const value = toValue(inputValue);

	const result = cases.find(([ predicate ]) => predicate(value))?.[1] 
    ?? defaultCase;

	const resolvedResult = resolveCase(result);

	return isUnitReturn(resolvedResult) 
		? resolvedResult[Symbol.toPrimitive]("string") 
		: resolvedResult;
};

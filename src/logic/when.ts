import { isUnitReturn, resolveCase } from "./utils";

type CaseWhen<T> = T | (() => T);
export const when = <T>(
	condition: boolean,
	trueCase: CaseWhen<T>,
	falseCase: CaseWhen<T>,
) => {
	const result = condition ? resolveCase(trueCase) : resolveCase(falseCase);

	return isUnitReturn(result) 
		? String(result)
		: result;
};

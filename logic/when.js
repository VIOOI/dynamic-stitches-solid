import { isUnitReturn, resolveCase } from "./utils";
export const when = (condition, trueCase, falseCase) => {
    const result = condition ? resolveCase(trueCase) : resolveCase(falseCase);
    return isUnitReturn(result)
        ? String(result)
        : result;
};

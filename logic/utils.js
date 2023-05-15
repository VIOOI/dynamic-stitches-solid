export const isUnitReturn = (val) => typeof val === "object" && val !== null && "isUnit" in val;
export const toValue = (val) => isUnitReturn(val) ? val.toNumber() : val;
export const resolveCase = (caseOrFn) => typeof caseOrFn === "function" ? caseOrFn() : caseOrFn;

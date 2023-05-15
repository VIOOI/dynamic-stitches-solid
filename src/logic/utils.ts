import { UnitReturn } from "../unit/unit";

type InputValue = string | number | UnitReturn;
export const isUnitReturn = (val: any): val is UnitReturn => 
	typeof val === "object" && val !== null && "isUnit" in val;

export const toValue = (val: InputValue): string | number => 
	isUnitReturn(val) ? val.toNumber() : val;

export const resolveCase = <T>(caseOrFn: T | (() => T)): T => 
	typeof caseOrFn === "function" ? (caseOrFn as () => T)() : caseOrFn;

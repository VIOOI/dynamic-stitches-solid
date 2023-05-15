import { UnitReturn } from "../unit/unit";
type InputValue = string | number | UnitReturn;
export declare const isUnitReturn: (val: any) => val is UnitReturn;
export declare const toValue: (val: InputValue) => string | number;
export declare const resolveCase: <T>(caseOrFn: T | (() => T)) => T;
export {};

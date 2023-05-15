import { UnitReturn } from "../unit/unit";
type CaseSwitch<T> = [(val: string | number) => boolean, T | (() => T)];
type InputValue = string | number | UnitReturn;
export declare const switcher: <T>(inputValue: InputValue, cases: CaseSwitch<T>[], defaultCase?: T | (() => T)) => any;
export {};

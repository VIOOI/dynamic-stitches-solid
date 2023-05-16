import { UnitReturn } from "../unit/unit";
type CaseSwitch<T> = [(val: string | number) => boolean, T | (() => T)];
type InputValue = string | number | UnitReturn;
type SwitcherArgs<T> = {
    input: InputValue;
    cases: CaseSwitch<T>[];
    onDeafult?: T | (() => T);
};
export declare function switcher<T>(args: SwitcherArgs<T>): string | T;
export declare function switcher<T>(input: InputValue, cases: CaseSwitch<T>[], onDeafult?: T | (() => T)): string | T;
export {};

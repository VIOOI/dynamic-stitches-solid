import { CSSProperties } from '@stitches/core';

type CalcValue = number | string;
type CssVariable = string;
type CssValue = CalcValue | CssVariable;
type UnitReturn = {
    value: string;
    isUnit: true;
    toNumber: () => number;
    [Symbol.toPrimitive]: (hint: any) => any;
};
interface UnitFunction extends Function {
    (): string;
    value: string;
    isUnit: true;
    toNumber: () => number;
    [Symbol.toPrimitive]: (hint: any) => any;
}
declare const createUnit: (defaultTargetUnit: string) => (value: CssValue, targetUnit?: string) => UnitFunction;

declare const color: (value: string, targetFormat?: string) => string;

type CaseWhen<T> = T | (() => T);
type WhenArgs<T> = {
    condition: boolean;
    onTrue: CaseWhen<T>;
    onFalse: CaseWhen<T>;
};
declare function when<T>(args: WhenArgs<T>): T;
declare function when<T>(condition: boolean, onTrue: CaseWhen<T>, onFalse: CaseWhen<T>): T;

type CaseSwitch<T> = [(val: string | number) => boolean, T | (() => T)];
type InputValue = string | number | UnitReturn;
type SwitcherArgs<T> = {
    input: InputValue;
    cases: CaseSwitch<T>[];
    onDeafult?: T | (() => T);
};
declare function switcher<T>(args: SwitcherArgs<T>): string | T;
declare function switcher<T>(input: InputValue, cases: CaseSwitch<T>[], onDeafult?: T | (() => T)): string | T;

type Formatter = (name: string, index: number, context: any) => string;
type CssGenerator = (index: number, count: number, context: any) => CSSProperties;
type Context = Record<string, any>;
type LoopArgs = {
    count: number;
    name: string;
    css: CssGenerator | CSSProperties;
    context?: Context;
    formatter?: Formatter;
};
declare function loop(args: LoopArgs): CSSProperties;
declare function loop(count: number, name: string, css: CssGenerator | CSSProperties, context?: Context, formatter?: Formatter): CSSProperties;

export { color, createUnit, loop, switcher, when };

export type CalcValue = number | string;
export type CssVariable = string;
export type CssValue = CalcValue | CssVariable;
export type UnitReturn = {
    value: string;
    isUnit: true;
    toNumber: () => number;
    [Symbol.toPrimitive]: (hint: any) => any;
};
export interface UnitFunction extends Function {
    (): string;
    value: string;
    isUnit: true;
    toNumber: () => number;
    [Symbol.toPrimitive]: (hint: any) => any;
}
export declare const createUnit: (defaultTargetUnit: string) => (value: CssValue, targetUnit?: string) => UnitFunction;

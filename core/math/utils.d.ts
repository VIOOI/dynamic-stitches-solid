import { CssValue } from "../unit/unit";
export declare const parseCssValue: (value: CssValue) => [number, string];
export declare const applyMathFunc: (mathFunc: (num: number) => number) => (value: CssValue) => string;
export declare const applyMathToTwo: (mathFunc: (num1: number, num2: number) => number) => (value1: CssValue, value2: CssValue) => string;
export declare const applyMathToDivide: (mathFunc: (num1: number, num2: number) => number) => (value1: CssValue, value2: number) => string;
export declare const getRandom: (lowerBound: number, upperBound: number, decimalPrecision?: number) => number;
type OperationFn = (...args: any[]) => any;
export declare const fw: (fn: OperationFn) => (...args: any[]) => any;
export {};

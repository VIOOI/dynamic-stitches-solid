import { createUnit } from "../unit/unit";
import { fw } from "./utils";

import { applyMathFunc, applyMathToDivide, applyMathToTwo, getRandom } from "./utils";


export const add =      fw(applyMathToTwo((a, b) => a + b ));
export const subtract = fw(applyMathToTwo((a, b) => a - b ));
export const multiply = fw(applyMathToDivide((a, b) => a * b ));
export const divide =   fw(applyMathToDivide((a, b) => a / b ));
export const mod =      fw(applyMathToTwo((a, b) => a % b ));
export const pow =      fw(applyMathToTwo((num1, num2) => Math.pow(num1, num2)));
export const round =    fw(applyMathFunc(Math.round));
export const sqrt =     fw(applyMathFunc(Math.sqrt));
export const sin =      fw(applyMathFunc(Math.sin));
export const cos =      fw(applyMathFunc(Math.cos));
export const tan =      fw(applyMathFunc(Math.tan));
export const log =      fw(applyMathFunc(Math.log));
export const exp =      fw(applyMathFunc(Math.exp));
export const abs =      fw(applyMathFunc(Math.abs));

export const random = (
	unit: "px" | "em" | "rem",
	min: number,
	max: number,
	dec?: number,
) => { 
	return createUnit(unit)(getRandom(min, max, dec ? dec : 0));
};

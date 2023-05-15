import { parseCssValue } from "../math/utils";

export type CalcValue = number | string;
export type CssVariable = string;
export type CssValue = CalcValue | CssVariable;

const unitsMap: Record<string, number> = {
	px: 1 / 16,
	em: 1,
	rem: 1,
};

const convertValue = (fromUnit: string, toUnit: string) => (value: number): number =>
	fromUnit === toUnit ? value : value * (unitsMap[fromUnit] / unitsMap[toUnit]);

const extractValueAndUnit = (defaultUnit: string) => (value: CssValue): [number, string] => {
	if (typeof value === "number") return [ value, defaultUnit ];

	const regex = /^(\d+(?:\.\d+)?)(px|em|rem)?$/;
	const match = value.match(regex);

	if (!match) throw new Error(`Неизвестная единица измерения: ${value}`);

	const [ , num, fromUnit ] = match;
	return [ parseFloat(num), fromUnit || defaultUnit ];
};

export type UnitReturn = {
	value: string,
	isUnit: true,
	toNumber: () => number,
	[Symbol.toPrimitive]: (hint: any) => any,
}

export interface UnitFunction extends Function {
	(): string,
	value: string;
	isUnit: true;
	toNumber: () => number;
	[Symbol.toPrimitive]: (hint: any) => any;
}
export const createUnit = (defaultTargetUnit: string) =>
	(value: CssValue, targetUnit = defaultTargetUnit): UnitFunction => {
		const [ floatValue, fromUnit ] = extractValueAndUnit(defaultTargetUnit)(value);
		const convertedValue = convertValue(fromUnit, targetUnit)(floatValue);
		const valuee = `${convertedValue}${targetUnit}`;

		const returnFunction = function() {
			return valuee;
		};
	
		returnFunction.value = valuee;
		returnFunction.isUnit = true;
		returnFunction.toNumber = function(): number {
			return parseCssValue(this.value)[0];
		};
		returnFunction[Symbol.toPrimitive] = function(hint: any) {
			if (hint === "string") return this.value.toString();

			if (hint === "number") 
				return this.value 
					? parseCssValue(this.value)[0] 
					: 0;

			return this.value;
		};

		return returnFunction as UnitFunction;
	};

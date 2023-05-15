import { parseCssValue } from "../math/utils";
const unitsMap = {
    px: 1 / 16,
    em: 1,
    rem: 1,
};
const convertValue = (fromUnit, toUnit) => (value) => fromUnit === toUnit ? value : value * (unitsMap[fromUnit] / unitsMap[toUnit]);
const extractValueAndUnit = (defaultUnit) => (value) => {
    if (typeof value === "number")
        return [value, defaultUnit];
    const regex = /^(\d+(?:\.\d+)?)(px|em|rem)?$/;
    const match = value.match(regex);
    if (!match)
        throw new Error(`Неизвестная единица измерения: ${value}`);
    const [, num, fromUnit] = match;
    return [parseFloat(num), fromUnit || defaultUnit];
};
export const createUnit = (defaultTargetUnit) => (value, targetUnit = defaultTargetUnit) => {
    const [floatValue, fromUnit] = extractValueAndUnit(defaultTargetUnit)(value);
    const convertedValue = convertValue(fromUnit, targetUnit)(floatValue);
    const valuee = `${convertedValue}${targetUnit}`;
    const returnFunction = function () {
        return valuee;
    };
    returnFunction.value = valuee;
    returnFunction.isUnit = true;
    returnFunction.toNumber = function () {
        return parseCssValue(this.value)[0];
    };
    returnFunction[Symbol.toPrimitive] = function (hint) {
        if (hint === "string")
            return this.value.toString();
        if (hint === "number")
            return this.value
                ? parseCssValue(this.value)[0]
                : 0;
        return this.value;
    };
    return returnFunction;
};

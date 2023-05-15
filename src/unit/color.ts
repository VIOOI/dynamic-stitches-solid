export type ColorFormat = "rgb" | "rgba" | "hex";

const hexToRgb = (hex: string) => 
	/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex).slice(1).map(hex => parseInt(hex, 16));

const rgbToHex = (rgb: number[]) => 
	"#" + rgb.map(x => x.toString(16).padStart(2, "0")).join("");

const matchPatterns = {
	"rgb": /rgb\((\d+),\s*(\d+),\s*(\d+)\)/,
	"rgba": /rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+(\.\d+)?)\)/,
	"hex": /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
};

const parseColor = (value: string) => {
	for (const format in matchPatterns) {
		const match = value.match(matchPatterns[format]);
		if (match) {
			return { format, values: format === "hex" ? hexToRgb(value) : match.slice(1).map(Number) };
		}
	}
	throw new Error("Unsupported color format");
};

export const color = (value: string, targetFormat: ColorFormat = "rgb"): string => {
	const { format, values } = parseColor(value);
	if (format === targetFormat) return value;

	const conversionFunctions = {
		"rgb": () => `rgb(${values.slice(0, 3).join(", ")})`,
		"rgba": () => `rgba(${[ ...values.slice(0, 3), 1 ].join(", ")})`,
		"hex": () => rgbToHex(values),
	};
    
	return conversionFunctions[targetFormat]();
};

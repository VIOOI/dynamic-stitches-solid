const hexToRgb = (hex: string) => Array.from(hex.slice(1), (_, i) => parseInt(hex.slice(i * 2 + 1, i * 2 + 3), 16));

const rgbToHex = (rgb: any[]) => "#" + rgb.map(x => x.toString(16).padStart(2, "0")).join("");

const matchPatterns = new Map([
    ["rgb", /rgb\((\d+),\s*(\d+),\s*(\d+)\)/],
    ["rgba", /rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+(\.\d+)?)\)/],
    ["hex", /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i],
]);

const parseColor = (value: string) => {
    for (const [format, pattern] of matchPatterns) {
        const match = value.match(pattern);
        if (match) {
            return { format, values: format === "hex" ? hexToRgb(value) : match.slice(1).map(Number) };
        }
    }
    throw new Error("Unsupported color format");
};

const conversionFunctions = new Map([
    ["rgb", (values: any[]) => `rgb(${values.slice(0, 3).join(", ")})`],
    ["rgba", (values): string => `rgba(${[...values.slice(0, 3), 1].join(", ")})`],
    ["hex", (values): string => rgbToHex(values)],
]);

export const color = (value: string, targetFormat = "rgb") => {
    const { format, values } = parseColor(value);
    if (format === targetFormat) return value;

    const convert = conversionFunctions.get(targetFormat);
    if (!convert) throw new Error("Unsupported target format");

    return convert(values);
}

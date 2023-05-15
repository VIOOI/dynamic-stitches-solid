export const loop = (count, baseName, css, context = {}, formatter = (base, index, context) => `& .${base}-${index + 1}`) => {
    return Array.from({ length: count }).reduce((res, _, i) => {
        const cssProperties = typeof css === "function" ? css(i, count, context) : css;
        res[formatter(baseName, i, context)] = { ...cssProperties };
        return res;
    }, {});
};

export function loop(countOrArgs, name, css, context = {}, formatter = (base, index, context) => `& .${base}-${index + 1}`) {
    let count;
    if (typeof countOrArgs === "number") {
        count = countOrArgs;
    }
    else {
        ({ count, name, css, context, formatter } = countOrArgs);
        context = context || {};
        formatter = formatter || ((base, index, context) => `& .${base}-${index + 1}`);
    }
    return Array.from({ length: count }).reduce((res, _, i) => {
        const cssProperties = typeof css === "function" ? css(i, count, context) : css;
        res[formatter(name, i, context)] = { ...cssProperties };
        return res;
    }, {});
}
;

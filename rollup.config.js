import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';
import path from 'path';
import fs from 'fs';

const inputs = fs.readdirSync('src').reduce((acc, file) => {
  if (path.extname(file) === '.ts') {
    acc[file] = `src/${file}`;
  }
  return acc;
}, {});

const config = [{
  input: inputs,
  output: {
    dir: '.',
    format: 'es',
    sourcemap: true,
    plugins: [terser()]
  },
  plugins: [
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
    }),
  ],
}];

for (const input in inputs) {
  config.push({
    input: inputs[input],
    output: {
      file: `${path.basename(input, '.ts')}.d.ts`,
      format: 'es',
    },
    plugins: [dts()],
  });
}

export default config;

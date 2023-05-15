import Terser from "terser";
import { glob } from "glob";

glob("./**/*.js", (err, files) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  files.forEach((file) => {
    Terser.minify({ [file]: require('fs').readFileSync(file, "utf8") })
      .then((result) => require('fs').writeFileSync(file, result.code))
      .catch((err) => console.error(`Error minifying ${file}: `, err));
  });
});

import esbuild from "esbuild";

const prelude = `/**
 * @license
 * Copyright ${new Date().getFullYear()} The Binaryen Authors.
 * SPDX-License-Identifier: Apache-2.0
 */`;

esbuild.build({
  entryPoints: [ "./src/index.js" ],
  bundle: true,
  minify: true,
  format: "esm",
  platform: "node", // Emscripten artifacts require path and fs, but don't use them
  outfile: "./index.js",
  legalComments: "none",
  banner: {
    js: prelude
  },
});

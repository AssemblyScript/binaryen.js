var glob = require("glob");
var fs   = require("fs");
var path = require("path");
var child_process = require("child_process");

var sourceDirectory = "binaryen/src";
var emscriptenDirectory = process.env.EMSCRIPTEN || "./emscripten";

// collect source files
var sourceFiles = [];
[
  "binaryen-c.cpp",
  "asmjs/*.cpp",
  "cfg/*.cpp",
  "emscripten-optimizer/*.cpp",
  "+(ast|ir)/*.cpp",
  "passes/*.cpp",
  "support/!(archive|file|command-line).cpp",
  "wasm/!(wasm-io).cpp",
  "wasm-emscripten.cpp"
]
.forEach(pattern => {
  var matches = glob.sync(sourceDirectory + "/" + pattern);
  if (!matches.length)
    throw Error("no matches for pattern '" + sourceDirectory + "/" + pattern + "' - did the directory structure change?");
  Array.prototype.push.apply(sourceFiles, matches);
});
console.log("Collected " + sourceFiles.length + " source files:\n  " + sourceFiles.join("\n  "));

// determine exported functions
var headerSource = require("fs").readFileSync(sourceDirectory + "/binaryen-c.h", "utf8");
var exportedFunctions = [];
var expression = /\b(Binaryen\w+)\([^)]*\);/g;
var match;
while (match = expression.exec(headerSource))
  if (exportedFunctions.indexOf(match[1]) < 0)
    exportedFunctions.push(match[1]);
console.log("\nFound " + exportedFunctions.length + " exported functions:\n  " + exportedFunctions.join("\n  "));

// compile
var cmd = '"' + path.join(emscriptenDirectory, "em++") + '"';
var arg = [
  "-s", "ALLOW_MEMORY_GROWTH=1",
  "-s", "DEMANGLE_SUPPORT=1",
  "-s", "DISABLE_EXCEPTION_CATCHING=0",
  "-s", "ELIMINATE_DUPLICATE_FUNCTIONS=1",
  "-s", "EXPORTED_FUNCTIONS='[" + exportedFunctions.map(name => "\"_" + name + "\"").join(",") + "]'",
  "--memory-init-file", "0",
  "--llvm-lto", "1",
  "--closure", "1",
  "--pre-js", sourceDirectory + "/js/binaryen.js-pre.js",
  "--post-js", sourceDirectory + "/js/binaryen.js-post.js",
  "-std=c++11",
  "-I" + sourceDirectory + "/",
  "-Oz",
  "-o", "index.js"
].concat(sourceFiles);
console.log("\nCompiling with: " + cmd + " " + arg.join(" "));
var ret = child_process.spawnSync(cmd, arg, { stdio: "inherit", shell: true });
if (ret.status)
  throw Error("exited with " + ret.status + " (see above for details)");
console.log("ok");

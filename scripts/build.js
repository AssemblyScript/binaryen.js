var glob = require("glob");
var fs   = require("fs");
var path = require("path");
var child_process = require("child_process");

var projectDirectory = ".";
var sourceDirectory = path.join("binaryen", "src");
var emscriptenDirectory = process.env.EMSCRIPTEN || path.join(".", "emscripten");

// collect source files
var sourceFiles = [];
[
  "binaryen-c.cpp",
  "asmjs/*.cpp",
  "cfg/*.cpp",
  "emscripten-optimizer/*.cpp",
  "ir/*.cpp",
  "passes/*.cpp",
  "support/!(archive|file|command-line).cpp",
  "wasm/!(wasm-io).cpp",
  "wasm-emscripten.cpp"
]
.forEach(pattern => {
  var matches = glob.sync(pattern = sourceDirectory + "/" + pattern);
  if (!matches.length)
    throw Error("no matches for pattern '" + pattern + "' - did the directory structure change?");
  Array.prototype.push.apply(sourceFiles, matches.map(path.normalize));
});
console.log("Collected " + sourceFiles.length + " source files:\n\n  " + sourceFiles.join("\n  ") + "\n");

// determine exported functions
var headerSource = require("fs").readFileSync(path.join(sourceDirectory, "binaryen-c.h"), "utf8");
var exportedFunctions = [];
var expression = /\b(Binaryen\w+)\([^)]*\);/g;
var match;
while (match = expression.exec(headerSource))
  if (exportedFunctions.indexOf(match[1]) < 0)
    exportedFunctions.push(match[1]);
console.log("Found " + exportedFunctions.length + " exported functions:\n\n  " + exportedFunctions.join("\n  ") + "\n");

var commonOptions = [
  "-s", "ALLOW_MEMORY_GROWTH=1",
  "-s", "DEMANGLE_SUPPORT=1",
  "-s", "DISABLE_EXCEPTION_CATCHING=0",
  "-s", "ELIMINATE_DUPLICATE_FUNCTIONS=1",
  "-s", /^win/.test(process.platform)
    ? "EXPORTED_FUNCTIONS=\"[" + exportedFunctions.map(name => "\\\"_" + name + "\\\"").join(",") + "]\""
    : "EXPORTED_FUNCTIONS='[" + exportedFunctions.map(name => "\"_" + name + "\"").join(",") + "]'",
  "--memory-init-file", "0",
  "--llvm-lto", "1",
  "-std=c++11",
  "-I" + sourceDirectory
];

function precompile() {
  var cmd = '"' + path.join(emscriptenDirectory, "em++") + '"';
  var arg = commonOptions.concat([
    "-o", "shared.bc"
  ]).concat(sourceFiles);
  console.log(cmd + " " + arg.join(" ") + "\n");
  var proc = child_process.spawnSync(cmd, arg, { stdio: "inherit", shell: true });
  if (proc.error)
    throw proc.error;
  if (proc.status !== 0)
    throw Error("exited with " + proc.status);
}

function compile(options) {
  var cmd = '"' + path.join(emscriptenDirectory, "em++") + '"';
  var arg = commonOptions.concat([
    "--closure", "1",
    "--pre-js", options.pre,
    "--post-js", options.post,
    "-Oz",
    "-o", options.out,
    "-Wno-almost-asm",
    "shared.bc"
  ]);
  console.log(cmd + " " + arg.join(" ") + "\n");
  var proc = child_process.spawnSync(cmd, arg, { stdio: "inherit", shell: true });
  if (proc.error)
    throw proc.error;
  if (proc.status !== 0)
    throw Error("exited with " + proc.status);
}

console.log("Compiling shared bitcode ...\n");
precompile();

console.log("\nCompiling binaryen.js ...\n");
compile({
  pre: path.join(sourceDirectory, "js", "binaryen.js-pre.js"),
  post: path.join(sourceDirectory, "js", "binaryen.js-post.js"),
  out: "index.js"
});

// console.log("\nCompiling minimal.js ...\n");
// compile({
//   pre: path.join(projectDirectory, "js", "minimal-pre.js"),
//   post: path.join(projectDirectory, "js", "minimal-post.js"),
//   out: "minimal.js"
// });

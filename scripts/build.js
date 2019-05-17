var glob  = require("glob");
var fs    = require("fs");
var path  = require("path");
var chalk = require("chalk");
var child_process = require("child_process");

var projectDirectory = ".";
var binaryenDirectory = path.join(projectDirectory, "binaryen");
var sourceDirectory = path.join(binaryenDirectory, "src");
var emscriptenDirectory = process.env.EMSCRIPTEN || path.join(projectDirectory, "emscripten");

// collect source files
var sourceFiles = [];
[
  "binaryen-c.cpp",
  "asmjs/*.cpp",
  "cfg/*.cpp",
  "emscripten-optimizer/*.cpp",
  "ir/*.cpp",
  "passes/*.cpp",
  "support/!(archive|command-line|path).cpp",
  "wasm/*.cpp"
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
var expression = /\b((?:Binaryen|Relooper)\w+)\([^)]*\);/g;
var match;
while (match = expression.exec(headerSource))
  if (exportedFunctions.indexOf(match[1]) < 0)
    exportedFunctions.push(match[1]);
console.log("Found " + exportedFunctions.length + " exported functions:\n\n  " + exportedFunctions.join("\n  ") + "\n");
var exportedFunctionsArg = exportedFunctions.map(name => "\"_" + name + "\"").join(",");

var commonOptions = [
  "--memory-init-file", "0",
  "--llvm-lto", "1",
  "-std=c++11",
  "-I" + sourceDirectory,
  "-s", "DEMANGLE_SUPPORT=1",
  "-s", "NO_FILESYSTEM=1",
  "-s", "DISABLE_EXCEPTION_CATCHING=0",
  "-s", "ERROR_ON_UNDEFINED_SYMBOLS=1"
];

/** Runs a command using the specified arguments. */
function runCommand(cmd, args) {
  var prev = null;
  console.log(chalk.cyanBright(cmd) + " " + args.map(arg => {
    if (arg.startsWith("-"))
      return chalk.gray("\\") + "\n " + chalk.bold(arg);
    return arg;
  }).join(" ") + "\n");
  var proc = child_process.spawnSync(cmd, args, { stdio: "inherit" });
  if (proc.error)
    throw proc.error;
  if (proc.status !== 0)
    throw Error("exited with " + proc.status);
  return proc;
}

/** Compiles embedded intrinsics used by the targets below. */
function compileIntrinsics() {
  var target = path.join(sourceDirectory, "passes", "WasmIntrinsics.cpp");
  runCommand("python", [
    path.join(binaryenDirectory, "scripts", "embedwast.py"),
    path.join(sourceDirectory, "passes", "wasm-intrinsics.wast"),
    target
  ]);
  sourceFiles.push(target);
}

/** Compiles shared bitcode used to build the targets below. */
function compileShared() {
  runCommand("python", [
    path.join(emscriptenDirectory, "em++")
  ].concat(sourceFiles).concat(commonOptions).concat([
    "-o", "shared.bc"
  ]));
}

/** Compiles the JavaScript target. */
function compileJs(options) {
  runCommand("python", [
    path.join(emscriptenDirectory, "em++"),
    "shared.bc"
  ].concat(commonOptions).concat([
    "--post-js", options.post,
    "--closure", "1",
    "-s", "WASM=0",
    "-s", "EXPORTED_FUNCTIONS=[" + exportedFunctionsArg + "]",
    "-s", "ALLOW_MEMORY_GROWTH=1",
    "-s", "ELIMINATE_DUPLICATE_FUNCTIONS=1",
    "-s", "MODULARIZE_INSTANCE=1",
    "-s", "EXPORT_NAME=\"Binaryen\"",
    "-o", options.out,
    "-Oz"
  ]));
}

/** Compiles the WebAssembly target. */
function compileWasm(options) {
  run("python", [
    path.join(emscriptenDirectory, "em++"),
    "shared.bc"
  ].concat(commonOptions).concat([
    "--post-js", options.post,
    "--closure", "1",
    "-s", "EXPORTED_FUNCTIONS=[" + exportedFunctionsArg + "]",
    "-s", "ALLOW_MEMORY_GROWTH=1",
    "-s", "BINARYEN=1",
    "-s", "BINARYEN_METHOD=\"native-wasm\"",
    "-s", "MODULARIZE_INSTANCE=1",
    "-s", "EXPORT_NAME=\"Binaryen\"",
    "-o", options.out,
    "-Oz"
  ]));
}

console.log("Compiling embedded intrinsics ...\n");
compileIntrinsics();

console.log("\nCompiling shared bitcode ...\n");
compileShared();

console.log("\nCompiling binaryen.js ...\n");
compileJs({
  post: path.join(sourceDirectory, "js", "binaryen.js-post.js"),
  out: "index.js"
});

// NOT YET FUNCTIONAL, but possible. Requires some changes to post.js

// console.log("\nCompiling binaryen-wasm.js ...\n");
// compileJs({
//   post: path.join(sourceDirectory, "js", "binaryen.js-post.js"),
//   out: "binaryen-wasm.js"
// });

var fs = require("fs"),
    path = require("path"),
    binaryen = require("..");

// TODO: more options
if (process.argv.length < 3) {
  console.error("Disassembles a WebAssembly binary to text format.\n\nUsage: " + path.basename(process.argv[1]) + " file.wasm");
  process.exit(1);
}

var data;
try {
  data = fs.readFileSync(process.argv[2]);
} catch (e) {
  console.error("Failed to open '" + process.argv[2] + "': " + e.code);
  process.exit(2);
}

var module = binaryen.readBinary(data);
process.stdout.write(module.emitText(), "utf8");

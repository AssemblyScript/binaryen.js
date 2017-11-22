var fs = require("fs"),
    path = require("path"),
    binaryen = require("..");

// TODO: more options
if (process.argv.length < 3) {
  console.error("Optimizes a WebAssembly binary.\n\nUsage: " + path.basename(process.argv[1]) + " file.wasm");
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
module.optimize();

if (process.stdout.isTTY)
  process.stdout.write(module.emitText(), "utf8");
else
  process.stdout.write(module.emitBinary());

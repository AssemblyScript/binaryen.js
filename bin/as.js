var fs = require("fs"),
    path = require("path"),
    binaryen = require("..");

// TODO: more options
if (process.argv.length < 3) {
  console.error("Assembles WebAssembly text format to a binary.\n\nUsage: " + path.basename(process.argv[1]) + " file.wast");
  process.exit(1);
}

var data;
try {
  data = fs.readFileSync(process.argv[2], "utf8");
} catch(e) {
  console.error("Failed to open '" + process.argv[2] + "': " + e.code);
  process.exit(2);
}

var module = binaryen.parseText(data);
process.stdout.write(module.emitBinary());

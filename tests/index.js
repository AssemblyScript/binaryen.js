var fs = require("fs");
var assert = require("assert");
var binaryen = require("..");

var txt, bin;

assert.doesNotThrow(function() {
  var mod = new binaryen.Module();
  mod.addFunction("main", mod.addFunctionType("i", binaryen.i32, []), [], mod.return(mod.i32.const(0)));
  txt = mod.emitText();
  bin = mod.emitBinary();
}, "constructing a simple module should not throw");

fs.readFile(__dirname + "/fixtures/index.text", function(err, contents) {
  assert.ifError(err);
  assert.strictEqual(txt, contents.toString().replace(/\r?\n/g, "\n"), "text contents should match the fixture");
});

fs.readFile(__dirname + "/fixtures/index.wasm", function(err, contents) {
  assert.ifError(err);
  assert(Buffer.compare(bin, contents) === 0, "binary contents should match the fixture");
});

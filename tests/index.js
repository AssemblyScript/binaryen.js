var fs = require("fs");
var assert = require("assert");
var binaryen = require("..");

// This test case exists to catch the most obvious issues before pushing the binary back to GitHub.
// It's not intended to be a full test suite, but feel free to extend it / send a PR if necessary!

var mod, txt, bin;

assert.doesNotThrow(function() {
  mod = new binaryen.Module();
  mod.addFunction("main", mod.addFunctionType("i", binaryen.i32, []), [], mod.return(mod.i32.const(0)));
  mod.addExport("main", "main");
}, "constructing a simple module should not throw");

assert.doesNotThrow(function() {
  txt = mod.emitText();
  assert(typeof txt === "string" && txt.length, "text output should be a non-empty string");
}, "emitting text should not throw");

assert.doesNotThrow(function() {
  bin = mod.emitBinary();
  assert(bin && bin.length, "binary output should be a non-empty array-like object");
}, "emitting binary should not throw");

assert.doesNotThrow(function() {
  assert(mod.validate(), "the module should be valid");
}, "validating the module should not throw");

assert.doesNotThrow(function() {
  mod.optimize();
}, "optimizing the module should not throw");

fs.readFile(__dirname + "/fixtures/index.text", function(err, contents) {
  assert.ifError(err, "the text fixture should exist");
  assert.strictEqual(txt, contents.toString().replace(/\r?\n/g, "\n"), "text output should match the text fixture");
});

fs.readFile(__dirname + "/fixtures/index.wasm", function(err, contents) {
  assert.ifError(err, "the binary fixture should exist");
  assert(Buffer.compare(bin, contents) === 0, "binary output should match the binary fixture");
});

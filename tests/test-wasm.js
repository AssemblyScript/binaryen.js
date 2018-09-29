var test = require("tape");
var binaryen = require("..");

var mod = new binaryen.Module();

require("./test-common")(test, binaryen, mod);

// <wasm only>

test("adding a memory import", function(test) {
  test.doesNotThrow(function() {
    mod.addMemoryImport("0", "env", "memory"); // doesn't work with a different internal name, yet
  });
  test.end();
});

test("adding a memory export", function(test) {
  test.doesNotThrow(function() {
    mod.addMemoryExport("0", "memory");
  });
  test.end();
});

// </wasm only>

var text;
test("emitting text", function(test) {
  test.doesNotThrow(function() {
    text = mod.emitText();
  });
  test.ok(typeof text === "string" && text.length, "should return be a non-empty string");
  test.end();
});

var binary;
test("emitting binary", function(test) {
  test.doesNotThrow(function() {
    binary = mod.emitBinary();
  });
  test.ok(binary && binary.length, "should return a non-empty array-like object");
  test.end();
});

test("validating the module", function(test) {
  var valid;
  test.doesNotThrow(function() {
    valid = mod.validate();
  });
  test.ok(valid, "the module should be valid");
  test.end();
});

test("optimizing the module", function(test) {
  test.doesNotThrow(function() {
    mod.optimize();
  });
  test.end();
});

test("validating the module again", function(test) {
  var valid;
  test.doesNotThrow(function() {
    valid = mod.validate();
  });
  test.ok(valid, "the module should be valid");
  test.end();
});

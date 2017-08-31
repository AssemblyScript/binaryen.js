var fs = require("fs");
var test = require("tape");

// This test case exists to catch the most obvious issues before pushing the binary back to GitHub.
// It's not intended to be a full test suite, but feel free to extend it / send a PR if necessary!

var binaryen;
test("requiring binaryen", function(test) {
  test.doesNotThrow(function() {
    binaryen = require("..");
  });
  test.end();
});

var mod;
test("constructing a module", function(test) {
  test.doesNotThrow(function() {
    mod = new binaryen.Module();
  });
  test.end();
});

var ftype;
test("adding a function type", function(test) {
  test.doesNotThrow(function() {
    ftype = mod.addFunctionType("i", binaryen.i32, []);
  });
  test.end();
});

var expr;
test("creating an expression", function(test) {
  test.doesNotThrow(function() {
    expr = mod.i32.const(0);
  });
  test.end();
});

var stmt;
test("creating a statement", function(test) {
  test.doesNotThrow(function() {
    stmt = mod.return(expr);
  });
  test.end();
});

test("adding a function", function(test) {
  test.doesNotThrow(function() {
    mod.addFunction("main", ftype, [], stmt);
  });
  test.end();
});

test("adding an export", function(test) {
  test.doesNotThrow(function() {
    mod.addExport("main", "main");
  });
  test.end();
});

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

var asmjs;
test("emitting asmjs", function(test) {
  test.doesNotThrow(function() {
    asmjs = mod.emitAsmjs();
  });
  test.ok(typeof asmjs === "string" && asmjs.length, "should return a non-empty string");
  test.end();
});

test("fixtures", function(test) {

  var textComp = fs.readFileSync(__dirname + "/fixtures/index.text").toString().replace(/\r?\n/g, "\n");
  test.strictEqual(text, textComp.toString().replace(/\r?\n/g, "\n"), "should match text output");

  var binaryComp = fs.readFileSync(__dirname + "/fixtures/index.wasm");
  test.ok(Buffer.compare(binary, binaryComp) === 0, "should match binary output");

  test.end();
});

var fs = require("fs");
var test = require("tape");

var isUpdate = process.argv[2] === "update";

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

test("adding a function import", function(test) {
  test.doesNotThrow(function() {
    mod.addFunctionImport("imported", "env", "provided", ftype);
  });
  test.end();
});

test("adding a function export", function(test) {
  test.doesNotThrow(function() {
    mod.addFunctionExport("main", "main");
  });
  test.end();
});

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

function stripComments(text) {
  return text.replace(/ \(; [\w$_]+ ;\)/g, "");
}

test("fixtures", function(test) {

  if (isUpdate) {
    fs.writeFileSync(__dirname + "/fixtures/index.wast", text, "utf8");
  } else {
    var textComp = fs.readFileSync(__dirname + "/fixtures/index.wast", "utf8").replace(/\r?\n/g, "\n");
    test.strictEqual(stripComments(text), stripComments(textComp), "should match text output");
  }

  if (isUpdate) {
    fs.writeFileSync(__dirname + "/fixtures/index.wasm", binary);
  } else {
    var binaryComp = fs.readFileSync(__dirname + "/fixtures/index.wasm");
    test.ok(Buffer.compare(binary, binaryComp) === 0, "should match binary output");
  }

  if (isUpdate) {
    fs.writeFileSync(__dirname + "/fixtures/index.asm.js", asmjs, "utf8");
  } else {
    // var asmjsComp = fs.readFileSync(__dirname + "/fixtures/index.asm.js");
    // test.strictEqual(asmjs, asmjsComp, "should match asm.js output");
  }

  test.end();
});

module.exports = function(test, binaryen, mod) {

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

} // exports

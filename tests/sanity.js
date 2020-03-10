const assert = require("assert");
const isWasm = process.argv[2] == "--wasm";

// Basic tests to make sure that we do not push something obviously broken

console.log("requiring binaryen");
var binaryen = isWasm ? require("../wasm") : require("..");
assert(binaryen);

console.log("awaiting ready");
binaryen.ready.then(test);

function test() {

  console.log("constructing a module");
  var mod = new binaryen.Module();
  assert(mod);

  console.log("creating an expression");
  var expr = mod.i32.const(0);
  assert(expr);

  console.log("creating a statement");
  var stmt = mod.return(expr);
  assert(stmt);

  console.log("adding a function");
  var func = mod.addFunction("main", binaryen.none, binaryen.i32, [], stmt);
  assert(func);

  console.log("creating a multi-value type");
  var mvtype = binaryen.createType([ binaryen.i32, binaryen.f64 ]);
  assert(mvtype);

  console.log("adding a function import");
  mod.addFunctionImport("func", "env", "func", mvtype, binaryen.i32);

  console.log("adding a function export");
  mod.addFunctionExport("main", "main");

  console.log("adding a memory import");
  mod.addMemoryImport("0", "env", "memory");

  console.log("adding a memory export");
  mod.addMemoryExport("0", "memory");

  console.log("validating the module");
  assert(mod.validate());

  console.log("emitting text");
  var text = mod.emitText();
  assert(typeof text === "string" && text.length);
  console.log(text);

  console.log("optimizing the module");
  assert.doesNotThrow(() => mod.optimize());

  console.log("emitting text (again)");
  text = mod.emitText();
  assert(typeof text === "string" && text.length);
  console.log(text);

  console.log("emitting a binary");
  var binary = mod.emitBinary();
  assert(binary && binary.length);
  console.log(Array.from(binary));

  console.log("emitting js");
  var js = mod.emitAsmjs();
  assert(typeof js === "string" && js.length);

  console.log("wrapping an existing module");
  var wrapped = binaryen.wrapModule(mod.ptr);
  assert(wrapped.getFunction("main"));

}

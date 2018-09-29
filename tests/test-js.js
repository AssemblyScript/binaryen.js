var test = require("tape");
var binaryen = require("..");

var mod = new binaryen.Module();

require("./test-common")(test, binaryen, mod);

// <js only>

test("emitting js", function(test) {
  var out;
  test.doesNotThrow(function() {
    out = mod.emitAsmjs();
  });
  test.ok(typeof out === "string" && out.length, "should return a non-empty string");
  test.end();
});

// </js only>

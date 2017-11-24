binaryen.js
===========

**binaryen.js** is a port of [Binaryen](https://github.com/WebAssembly/binaryen) to the Web, allowing you to generate WebAssembly using a JavaScript API.

[![npm](https://img.shields.io/npm/v/binaryen.svg)](https://www.npmjs.com/package/binaryen) [![npm (tag)](https://img.shields.io/npm/v/binaryen/nightly.svg)](https://www.npmjs.com/package/binaryen) [![Build Status](https://travis-ci.org/AssemblyScript/binaryen.js.svg?branch=master)](https://travis-ci.org/AssemblyScript/binaryen.js)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Contents

- [Usage](#usage)
- [API](#api)
  - [Types](#types)
  - [Module construction](#module-construction)
  - [Module manipulation](#module-manipulation)
  - [Module validation](#module-validation)
  - [Module creation](#module-creation)
  - [Module debugging](#module-debugging)
  - [Expression construction](#expression-construction)
    - [Control flow](#control-flow)
    - [Constants](#constants)
    - [Variable accesses](#variable-accesses)
    - [Integer operations](#integer-operations)
    - [Floating point operations](#floating-point-operations)
    - [Datatype conversions](#datatype-conversions)
    - [Function calls](#function-calls)
    - [Linear memory accesses](#linear-memory-accesses)
    - [Host operations](#host-operations)
    - [Atomic memory accesses 🦄](#atomic-memory-accesses-)
    - [Atomic read-modify-write operations 🦄](#atomic-read-modify-write-operations-)
    - [Atomic wait and wake operations 🦄](#atomic-wait-and-wake-operations-)
  - [Expression manipulation](#expression-manipulation)
  - [Relooper](#relooper)
- [Building](#building)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Usage
-----

```
$> npm install binaryen
```

```js
var binaryen = require("binaryen");

var myModule = new binaryen.Module();

myModule.addFunction("main", myModule.addFunctionType("i", binaryen.i32, []), [],
  myModule.return(
    myModule.i32.const(0)
  )
);
myModule.addFunctionExport("main", "main");

var textData = myModule.emitText();
var wasmData = myModule.emitBinary();
...
```

The buildbot also publishes nightly versions once a day if there have been changes. The latest nightly can be installed through

```
$> npm install binaryen@nightly
```

or you can use one of the [previous versions](https://github.com/AssemblyScript/binaryen.js/tags) instead if necessary.

API
---

[Future features](http://webassembly.org/docs/future-features/) 🦄 might not be supported by all runtimes.

### Types

 * **none**: `Type`<br />
   The none type, e.g., `void`.

 * **i32**: `Type`<br />
   32-bit integer type.

 * **i64**: `Type`<br />
   64-bit integer type.

 * **f32**: `Type`<br />
   32-bit float type.

 * **f64**: `Type`<br />
   64-bit float (double) type.

 * **undefined**: `Type`<br />
   Special type used with blocks to let the API figure out its result type on its own.

### Module construction

 * new **Module**(): `Module`<br />
   Constructs a new module.

 * **parseText**(text: `string`): `Module`<br />
   Creates a module from Binaryen's s-expression text format (not official stack-style text format).

 * **readBinary**(data: `Uint8Array`): `Module`<br />
   Creates a module from binary data.

### Module manipulation

* Module#**addFunctionType**(name: `string`, resultType: `Type`, paramTypes: `Type[]`): `Signature`<br />
  Adds a new function type.

* Module#**getFunctionTypeBySignature**(resultType: `Type`, paramTypes: `Type[]`): `Signature`<br />
  Gets an existing function type by its parametric signature. Returns `0` if there is no such function type.

* Module#**addFunction**(name: `string`, functionType: `Signature`, varTypes: `Type[]`, body: `Expression`): `Function`<br />
  Adds a function. `varTypes` indicate additional locals, in the given order.

* Module#**getFunction**(name: `string`): `Function`<br />
  Gets a function, by name,

* Module#**removeFunction**(name: `string`): `void`<br />
  Removes a function, by name.

* Module#**addFunctionImport**(internalName: `string`, externalModuleName: `string`, externalBaseName: `string`, functionType: `Signature`): `Import`<br />
  Adds a function import.

* Module#**addTableImport**(internalName: `string`, externalModuleName: `string`, externalBaseName: `string`): `Import`<br />
  Adds a table import. There's just one table for now, using name `"0"`.

* Module#**addMemoryImport**(internalName: `string`, externalModuleName: `string`, externalBaseName: `string`): `Import`<br />
  Adds a memory import. There's just one memory for now, using name `"0"`.

* Module#**addGlobalImport**(internalName: `string`, externalModuleName: `string`, externalBaseName: `string`, globalType: `Type`): `Import`<br />
  Adds a global variable import. Imported globals must be immutable.

* Module#**removeImport**(internalName: `string`): `void`<br />
  Removes an import, by internal name.

* Module#**addFunctionExport**(internalName: `string`, externalName: `string`): `Export`<br />
  Adds a function export.

* Module#**addTableExport**(internalName: `string`, externalName: `string`): `Export`<br />
  Adds a table export. There's just one table for now, using name `"0"`.

* Module#**addMemoryExport**(internalName: `string`, externalName: `string`): `Export`<br />
  Adds a memory export. There's just one memory for now, using name `"0"`.

* Module#**addGlobalExport**(internalName: `string`, externalName: `string`): `Export`<br />
  Adds a global variable export. Exported globals must be immutable.

* Module#**removeExport**(externalName: `string`): `void`<br />
  Removes an export, by external name.

* Module#**setFunctionTable**(funcs: `Function[]`): `void`<br />
  Sets the contents of the function table. There's just one table for now, using name `"0"`.

* Module#**setMemory**(initial: `number`, maximum: `number`, exportName: `string | null`, segments: `MemorySegment[]`): `void`<br />
  Sets the memory. There's just one memory for now, using name `"0"`. Providing `exportName` also creates a memory export.

* Module#**setStart**(start: `Function`): `void`<br />
  Sets the start function.

* Module#**optimize**(): `void`<br />
  Optimizes the module using the default optimization passes.

* Module#**optimizeFunction**(func: `Function | string`): `void`<br />
  Optimizes a single function using the default optimization passes.

* Module#**runPasses**(passes: `string[]`): `void`<br />
  Runs the specified passes on the module.

* Module#**runPassesOnFunction**(func: `Function | string`, passes: `string[]`): `void`<br />
  Runs the specified passes on a single function.

* Module#**autoDrop**(): `void`<br />
  Enables automatic insertion of `drop` operations where needed. Lets you not worry about dropping when creating your code.

### Module validation

* Module#**validate**(): `boolean`<br />
  Validates the module. Returns `true` if valid, otherwise prints validation errors and returns `false`.

### Module creation

* Module#**emitBinary**(): `Uint8Array`<br />
  Returns the module in binary format.

* Module#**emitText**(): `string`<br />
  Returns the module in Binaryen's s-expression text format (not official stack-style text format).

* Module#**emitAsmjs**(): `string`<br />
  Returns the [asm.js](http://asmjs.org/) representation of the module.

* Module#**dispose**(): `void`<br />
  Releases the resources held by the module once it isn't needed anymore.

### Module debugging

* Module#**setAPITracing**(on: `boolean`): `void`<br />
  Enables tracing of the C-API in the console. Can be very useful when filing bug reports.

* Module#**interpret**(): `void`<br />
  Runs the module in the interpreter, calling the start function.

### Expression construction

#### [Control flow](http://webassembly.org/docs/semantics/#control-constructs-and-instructions)

* Module#**block**(label: `string | null`, children: `Expression[]`, type?: `Type`): `Expression`<br />
  Creates a block. `type` defaults to the `undefined` type explained [above](#types).

* Module#**if**(condition: `Expression`, ifTrue: `Expression`, ifFalse?: `Expression`): `Expression`<br />
  Creates an if or if/else combination.
  
* Module#**loop**(label: `string | null`, body: `Expression`): `Expression`<br />
  Creates a loop.

* Module#**break**(label: `string`, condition?: `Expression`, value?: `Expression`): `Expression`<br />
  Creates a break (br) to a label.
  
* Module#**switch**(labels: `string[]`, defaultLabel: `string`, condition: `Expression`, value?: `Expression`): `Expression`<br />
  Creates a switch (br_table).

* Module#**nop**(): `Expression`<br />
  Creates a no-operation (nop) instruction.

* Module#**return**(value?: `Expression`): `Expression`
  Creates a return.

* Module#**unreachable**(): `Expression`<br />
  Creates an [unreachable](http://webassembly.org/docs/semantics/#unreachable) instruction that will always trap.

* Module#**drop**(value: `Expression`): `Expression`<br />
  Creates a [drop](http://webassembly.org/docs/semantics/#type-parametric-operators) of a value.

* Module#**select**(condition: `Expression`, ifTrue: `Expression`, ifFalse: `Expression`): `Expression`<br />
  Creates a [select](http://webassembly.org/docs/semantics/#type-parametric-operators), i.e., ternary if.

#### [Constants](http://webassembly.org/docs/semantics/#constants)

* Module#i32.**const**(value: `number`): `I32Expression`
>
* Module#i64.**const**(low: `number`, high: `number`): `I64Expression`
>
* Module#f32.**const**(value: `number`): `F32Expression`
* Module#f32.**const_bits**(value: `number`): `F32Expression`
>
* Module#f64.**const**(value: `number`): `F64Expression`
* Module#f64.**const_bits**(low: `number`, high: `number`): `F64Expression`

#### [Variable accesses](http://webassembly.org/docs/semantics/#local-variables)

* Module#**getLocal**(index: `number`, type: `Type`): `Expression`<br />
  Creates a get_local for the local at the specified index. Note that we must specify the type here as we may not have created the local being called yet.

* Module#**setLocal**(index: `number`, value: `Expression`): `Expression`<br />
  Creates a set_local for the local at the specified index.

* Module#**teeLocal**(index: `number`, value: `Expression`): `Expression`<br />
  Creates a tee_local for the local at the specified index. A tee differs from a set in that the value remains on the stack.

* Module#**getGlobal**(name: `string`, type: `Type`): `Expression`<br />
  Creates a get_global for the global with the specified name. Note that we must specify the type here as we may not have created the global being called yet.

* Module#**setGlobal**(name: `string`, value: `Expression`): `Expression`<br />
  Creates a set_global for the global with the specified name.

#### [Integer operations](http://webassembly.org/docs/semantics/#32-bit-integer-operators)

* Module#i32.**clz**(value: `I32Expression`): `I32Expression`
* Module#i32.**ctz**(value: `I32Expression`): `I32Expression`
* Module#i32.**popcnt**(value: `I32Expression`): `I32Expression`
* Module#i32.**eqz**(value: `I32Expression`): `I32Expression`
* Module#i32.**add**(left: `I32Expression`, right: `I32Expression`): `I32Expression`
* Module#i32.**sub**(left: `I32Expression`, right: `I32Expression`): `I32Expression`
* Module#i32.**mul**(left: `I32Expression`, right: `I32Expression`): `I32Expression`
* Module#i32.**div_s**(left: `I32Expression`, right: `I32Expression`): `I32Expression`
* Module#i32.**div_u**(left: `I32Expression`, right: `I32Expression`): `I32Expression`
* Module#i32.**rem_s**(left: `I32Expression`, right: `I32Expression`): `I32Expression`
* Module#i32.**rem_u**(left: `I32Expression`, right: `I32Expression`): `I32Expression`
* Module#i32.**and**(left: `I32Expression`, right: `I32Expression`): `I32Expression`
* Module#i32.**or**(left: `I32Expression`, right: `I32Expression`): `I32Expression`
* Module#i32.**xor**(left: `I32Expression`, right: `I32Expression`): `I32Expression`
* Module#i32.**shl**(left: `I32Expression`, right: `I32Expression`): `I32Expression`
* Module#i32.**shr_u**(left: `I32Expression`, right: `I32Expression`): `I32Expression`
* Module#i32.**shr_s**(left: `I32Expression`, right: `I32Expression`): `I32Expression`
* Module#i32.**rotl**(left: `I32Expression`, right: `I32Expression`): `I32Expression`
* Module#i32.**rotr**(left: `I32Expression`, right: `I32Expression`): `I32Expression`
* Module#i32.**eq**(left: `I32Expression`, right: `I32Expression`): `I32Expression`
* Module#i32.**ne**(left: `I32Expression`, right: `I32Expression`): `I32Expression`
* Module#i32.**lt_s**(left: `I32Expression`, right: `I32Expression`): `I32Expression`
* Module#i32.**lt_u**(left: `I32Expression`, right: `I32Expression`): `I32Expression`
* Module#i32.**le_s**(left: `I32Expression`, right: `I32Expression`): `I32Expression`
* Module#i32.**le_u**(left: `I32Expression`, right: `I32Expression`): `I32Expression`
* Module#i32.**gt_s**(left: `I32Expression`, right: `I32Expression`): `I32Expression`
* Module#i32.**gt_u**(left: `I32Expression`, right: `I32Expression`): `I32Expression`
* Module#i32.**ge_s**(left: `I32Expression`, right: `I32Expression`): `I32Expression`
* Module#i32.**ge_u**(left: `I32Expression`, right: `I32Expression`): `I32Expression`
>
* Module#i64.**clz**(value: `I64Expression`): `I64Expression`
* Module#i64.**ctz**(value: `I64Expression`): `I64Expression`
* Module#i64.**popcnt**(value: `I64Expression`): `I64Expression`
* Module#i64.**eqz**(value: `I64Expression`): `I64Expression`
* Module#i64.**add**(left: `I64Expression`, right: `I64Expression`): `I64Expression`
* Module#i64.**sub**(left: `I64Expression`, right: `I64Expression`): `I64Expression`
* Module#i64.**mul**(left: `I64Expression`, right: `I64Expression`): `I64Expression`
* Module#i64.**div_s**(left: `I64Expression`, right: `I64Expression`): `I64Expression`
* Module#i64.**div_u**(left: `I64Expression`, right: `I64Expression`): `I64Expression`
* Module#i64.**rem_s**(left: `I64Expression`, right: `I64Expression`): `I64Expression`
* Module#i64.**rem_u**(left: `I64Expression`, right: `I64Expression`): `I64Expression`
* Module#i64.**and**(left: `I64Expression`, right: `I64Expression`): `I64Expression`
* Module#i64.**or**(left: `I64Expression`, right: `I64Expression`): `I64Expression`
* Module#i64.**xor**(left: `I64Expression`, right: `I64Expression`): `I64Expression`
* Module#i64.**shl**(left: `I64Expression`, right: `I64Expression`): `I64Expression`
* Module#i64.**shr_u**(left: `I64Expression`, right: `I64Expression`): `I64Expression`
* Module#i64.**shr_s**(left: `I64Expression`, right: `I64Expression`): `I64Expression`
* Module#i64.**rotl**(left: `I64Expression`, right: `I64Expression`): `I64Expression`
* Module#i64.**rotr**(left: `I64Expression`, right: `I64Expression`): `I64Expression`
* Module#i64.**eq**(left: `I64Expression`, right: `I64Expression`): `I64Expression`
* Module#i64.**ne**(left: `I64Expression`, right: `I64Expression`): `I64Expression`
* Module#i64.**lt_s**(left: `I64Expression`, right: `I64Expression`): `I64Expression`
* Module#i64.**lt_u**(left: `I64Expression`, right: `I64Expression`): `I64Expression`
* Module#i64.**le_s**(left: `I64Expression`, right: `I64Expression`): `I64Expression`
* Module#i64.**le_u**(left: `I64Expression`, right: `I64Expression`): `I64Expression`
* Module#i64.**gt_s**(left: `I64Expression`, right: `I64Expression`): `I64Expression`
* Module#i64.**gt_u**(left: `I64Expression`, right: `I64Expression`): `I64Expression`
* Module#i64.**ge_s**(left: `I64Expression`, right: `I64Expression`): `I64Expression`
* Module#i64.**ge_u**(left: `I64Expression`, right: `I64Expression`): `I64Expression`

#### [Floating point operations](http://webassembly.org/docs/semantics/#floating-point-operators)

* Module#f32.**neg**(value: `F32Expression`): `F32Expression`
* Module#f32.**abs**(value: `F32Expression`): `F32Expression`
* Module#f32.**ceil**(value: `F32Expression`): `F32Expression`
* Module#f32.**floor**(value: `F32Expression`): `F32Expression`
* Module#f32.**trunc**(value: `F32Expression`): `F32Expression`
* Module#f32.**nearest**(value: `F32Expression`): `F32Expression`
* Module#f32.**sqrt**(value: `F32Expression`): `F32Expression`
* Module#f32.**add**(left: `F32Expression`, right: `F32Expression`): `F32Expression`
* Module#f32.**sub**(left: `F32Expression`, right: `F32Expression`): `F32Expression`
* Module#f32.**mul**(left: `F32Expression`, right: `F32Expression`): `F32Expression`
* Module#f32.**div**(left: `F32Expression`, right: `F32Expression`): `F32Expression`
* Module#f32.**copysign**(left: `F32Expression`, right: `F32Expression`): `F32Expression`
* Module#f32.**min**(left: `F32Expression`, right: `F32Expression`): `F32Expression`
* Module#f32.**max**(left: `F32Expression`, right: `F32Expression`): `F32Expression`
* Module#f32.**eq**(left: `F32Expression`, right: `F32Expression`): `F32Expression`
* Module#f32.**ne**(left: `F32Expression`, right: `F32Expression`): `F32Expression`
* Module#f32.**lt**(left: `F32Expression`, right: `F32Expression`): `F32Expression`
* Module#f32.**le**(left: `F32Expression`, right: `F32Expression`): `F32Expression`
* Module#f32.**gt**(left: `F32Expression`, right: `F32Expression`): `F32Expression`
* Module#f32.**ge**(left: `F32Expression`, right: `F32Expression`): `F32Expression`
>
* Module#f64.**neg**(value: `F64Expression`): `F64Expression`
* Module#f64.**abs**(value: `F64Expression`): `F64Expression`
* Module#f64.**ceil**(value: `F64Expression`): `F64Expression`
* Module#f64.**floor**(value: `F64Expression`): `F64Expression`
* Module#f64.**trunc**(value: `F64Expression`): `F64Expression`
* Module#f64.**nearest**(value: `F64Expression`): `F64Expression`
* Module#f64.**sqrt**(value: `F64Expression`): `F64Expression`
* Module#f64.**add**(left: `F64Expression`, right: `F64Expression`): `F64Expression`
* Module#f64.**sub**(left: `F64Expression`, right: `F64Expression`): `F64Expression`
* Module#f64.**mul**(left: `F64Expression`, right: `F64Expression`): `F64Expression`
* Module#f64.**div**(left: `F64Expression`, right: `F64Expression`): `F64Expression`
* Module#f64.**copysign**(left: `F64Expression`, right: `F64Expression`): `F64Expression`
* Module#f64.**min**(left: `F64Expression`, right: `F64Expression`): `F64Expression`
* Module#f64.**max**(left: `F64Expression`, right: `F64Expression`): `F64Expression`
* Module#f64.**eq**(left: `F64Expression`, right: `F64Expression`): `F64Expression`
* Module#f64.**ne**(left: `F64Expression`, right: `F64Expression`): `F64Expression`
* Module#f64.**lt**(left: `F64Expression`, right: `F64Expression`): `F64Expression`
* Module#f64.**le**(left: `F64Expression`, right: `F64Expression`): `F64Expression`
* Module#f64.**gt**(left: `F64Expression`, right: `F64Expression`): `F64Expression`
* Module#f64.**ge**(left: `F64Expression`, right: `F64Expression`): `F64Expression`

#### [Datatype conversions](http://webassembly.org/docs/semantics/#datatype-conversions-truncations-reinterpretations-promotions-and-demotions)

* Module#i32.**trunc_s.f32**(value: `F32Expression`): `I32Expression`
* Module#i32.**trunc_s.f64**(value: `F64Expression`): `I32Expression`
* Module#i32.**trunc_u.f32**(value: `F32Expression`): `I32Expression`
* Module#i32.**trunc_u.f64**(value: `F64Expression`): `I32Expression`
* Module#i32.**reinterpret**(value: `F32Expression`): `I32Expression`
* Module#i32.**wrap**(value: `I64Expression`): `I32Expression`
>
* Module#i64.**trunc_s.f32**(value: `F32Expression`): `I64Expression`
* Module#i64.**trunc_s.f64**(value: `F64Expression`): `I64Expression`
* Module#i64.**trunc_u.f32**(value: `F32Expression`): `I64Expression`
* Module#i64.**trunc_u.f64**(value: `F64Expression`): `I64Expression`
* Module#i64.**reinterpret**(value: `F64Expression`): `I64Expression`
* Module#i64.**extend_s**(value: `I32Expression`): `I64Expression`
* Module#i64.**extend_u**(value: `I32Expression`): `I64Expression`
>
* Module#f32.**reinterpret**(value: `I32Expression`): `F32Expression`
* Module#f32.**convert_s.i32**(value: `I32Expression`): `F32Expression`
* Module#f32.**convert_s.i64**(value: `I64Expression`): `F32Expression`
* Module#f32.**convert_u.i32**(value: `I32Expression`): `F32Expression`
* Module#f32.**convert_u.i64**(value: `I64Expression`): `F32Expression`
* Module#f32.**demote**(value: `F64Expression`): `F32Expression`
>
* Module#f64.**reinterpret**(value: `I32Expression`): `F64Expression`
* Module#f64.**convert_s.i32**(value: `I32Expression`): `F64Expression`
* Module#f64.**convert_s.i64**(value: `I64Expression`): `F64Expression`
* Module#f64.**convert_u.i32**(value: `I32Expression`): `F64Expression`
* Module#f64.**convert_u.i64**(value: `I64Expression`): `F64Expression`
* Module#f64.**promote**(value: `F32Expression`): `F64Expression`

#### [Function calls](http://webassembly.org/docs/semantics/#calls)

* Module#**call**(name: `string`, operands: `Expression[]`, returnType: `Type`): `Expression`<br />
  Creates a call to a function. Note that we must specify the return type here as we may not have created the function being called yet.

* Module#**callImport**(name: `string`, operands: `Expression[]`, returnType: `Type`): `Expression`<br />
  Similar to **call**, but calls an imported function.

* Module#**callIndirect**(target: `Expression`, operands: `Expression[]`, returnType: `Type`): `Expression`<br />
  Similar to **call**, but calls indirectly, i.e., via a function pointer, so an expression replaces the name as the called value.

#### [Linear memory accesses](http://webassembly.org/docs/semantics/#linear-memory-accesses)

* Module#i32.**load**(offset: `number`, align: `number`, ptr: `Expression`): `I32Expression`<br />
* Module#i32.**load8_s**(offset: `number`, align: `number`, ptr: `Expression`): `I32Expression`<br />
* Module#i32.**load8_u**(offset: `number`, align: `number`, ptr: `Expression`): `I32Expression`<br />
* Module#i32.**load16_s**(offset: `number`, align: `number`, ptr: `Expression`): `I32Expression`<br />
* Module#i32.**load16_u**(offset: `number`, align: `number`, ptr: `Expression`): `I32Expression`<br />
* Module#i32.**store**(offset: `number`, align: `number`, ptr: `Expression`, value: `I32Expression`): `Expression`<br />
* Module#i32.**store8**(offset: `number`, align: `number`, ptr: `Expression`, value: `I32Expression`): `Expression`<br />
* Module#i32.**store16**(offset: `number`, align: `number`, ptr: `Expression`, value: `I32Expression`): `Expression`<br />
>
* Module#i64.**load**(offset: `number`, align: `number`, ptr: `Expression`): `I64Expression`
* Module#i64.**load8_s**(offset: `number`, align: `number`, ptr: `Expression`): `I64Expression`
* Module#i64.**load8_u**(offset: `number`, align: `number`, ptr: `Expression`): `I64Expression`
* Module#i64.**load16_s**(offset: `number`, align: `number`, ptr: `Expression`): `I64Expression`
* Module#i64.**load16_u**(offset: `number`, align: `number`, ptr: `Expression`): `I64Expression`
* Module#i64.**load32_s**(offset: `number`, align: `number`, ptr: `Expression`): `I64Expression`
* Module#i64.**load32_u**(offset: `number`, align: `number`, ptr: `Expression`): `I64Expression`
* Module#i64.**store**(offset: `number`, align: `number`, ptr: `Expression`, value: `I64Expression`): `Expression`
* Module#i64.**store8**(offset: `number`, align: `number`, ptr: `Expression`, value: `I64Expression`): `Expression`
* Module#i64.**store16**(offset: `number`, align: `number`, ptr: `Expression`, value: `I64Expression`): `Expression`
* Module#i64.**store32**(offset: `number`, align: `number`, ptr: `Expression`, value: `I64Expression`): `Expression`
>
* Module#f32.**load**(offset: `number`, align: `number`, ptr: `Expression`): `F32Expression`
* Module#f32.**store**(offset: `number`, align: `number`, ptr: `Expression`, value: `F32Expression`): `Expression`
>
* Module#f64.**load**(offset: `number`, align: `number`, ptr: `Expression`): `F64Expression`
* Module#f64.**store**(offset: `number`, align: `number`, ptr: `Expression`, value: `F64Expression`): `Expression`

#### [Host operations](http://webassembly.org/docs/semantics/#resizing)

* Module#**currentMemory**(): `I32Expression`
* Module#**growMemory**(value: `number`): `I32Expression`
* Module#**hasFeature**(name: `string`): `Expression` 🦄

#### [Atomic memory accesses](https://github.com/WebAssembly/threads/blob/master/proposals/threads/Overview.md#atomic-memory-accesses) 🦄

* Module#i32.**atomic.load**(offset: `number`, ptr: `Expression`): `I32Expression`
* Module#i32.**atomic.load8_u**(offset: `number`, ptr: `Expression`): `I32Expression`
* Module#i32.**atomic.load16_u**(offset: `number`, ptr: `Expression`): `I32Expression`
* Module#i32.**atomic.store**(offset: `number`, ptr: `Expression`, value: `I32Expression`): `Expression`
* Module#i32.**atomic.store8**(offset: `number`, ptr: `Expression`, value: `I32Expression`): `Expression`
* Module#i32.**atomic.store16**(offset: `number`, ptr: `Expression`, value: `I32Expression`): `Expression`
>
* Module#i64.**atomic.load**(offset: `number`, ptr: `Expression`): `I64Expression`
* Module#i64.**atomic.load8_u**(offset: `number`, ptr: `Expression`): `I64Expression`
* Module#i64.**atomic.load16_u**(offset: `number`, ptr: `Expression`): `I64Expression`
* Module#i64.**atomic.load32_u**(offset: `number`, ptr: `Expression`): `I64Expression`
* Module#i64.**atomic.store**(offset: `number`, ptr: `Expression`, value: `I64Expression`): `Expression`
* Module#i64.**atomic.store8**(offset: `number`, ptr: `Expression`, value: `I64Expression`): `Expression`
* Module#i64.**atomic.store16**(offset: `number`, ptr: `Expression`, value: `I64Expression`): `Expression`
* Module#i64.**atomic.store32**(offset: `number`, ptr: `Expression`, value: `I64Expression`): `Expression`

#### [Atomic read-modify-write operations](https://github.com/WebAssembly/threads/blob/master/proposals/threads/Overview.md#read-modify-write) 🦄

* Module#i32.**atomic.rmw.add**(offset: `number`, ptr: `Expression`, value: `I32Expression`): `I32Expression`
* Module#i32.**atomic.rmw.sub**(offset: `number`, ptr: `Expression`, value: `I32Expression`): `I32Expression`
* Module#i32.**atomic.rmw.and**(offset: `number`, ptr: `Expression`, value: `I32Expression`): `I32Expression`
* Module#i32.**atomic.rmw.or**(offset: `number`, ptr: `Expression`, value: `I32Expression`): `I32Expression`
* Module#i32.**atomic.rmw.xor**(offset: `number`, ptr: `Expression`, value: `I32Expression`): `I32Expression`
* Module#i32.**atomic.rmw.xchg**(offset: `number`, ptr: `Expression`, value: `I32Expression`): `I32Expression`
* Module#i32.**atomic.rmw.cmpxchg**(offset: `number`, ptr: `Expression`, expected: `I32Expression`, replacement: `I32Expression`): `I32Expression`
* Module#i32.**atomic.rmw8_u.add**(offset: `number`, ptr: `Expression`, value: `I32Expression`): `I32Expression`
* Module#i32.**atomic.rmw8_u.sub**(offset: `number`, ptr: `Expression`, value: `I32Expression`): `I32Expression`
* Module#i32.**atomic.rmw8_u.and**(offset: `number`, ptr: `Expression`, value: `I32Expression`): `I32Expression`
* Module#i32.**atomic.rmw8_u.or**(offset: `number`, ptr: `Expression`, value: `I32Expression`): `I32Expression`
* Module#i32.**atomic.rmw8_u.xor**(offset: `number`, ptr: `Expression`, value: `I32Expression`): `I32Expression`
* Module#i32.**atomic.rmw8_u.xchg**(offset: `number`, ptr: `Expression`, value: `I32Expression`): `I32Expression`
* Module#i32.**atomic.rmw8_u.cmpxchg**(offset: `number`, ptr: `Expression`, expected: `I32Expression`, replacement: `I32Expression`): `I32Expression`
* Module#i32.**atomic.rmw16_u.add**(offset: `number`, ptr: `Expression`, value: `I32Expression`): `I32Expression`
* Module#i32.**atomic.rmw16_u.sub**(offset: `number`, ptr: `Expression`, value: `I32Expression`): `I32Expression`
* Module#i32.**atomic.rmw16_u.and**(offset: `number`, ptr: `Expression`, value: `I32Expression`): `I32Expression`
* Module#i32.**atomic.rmw16_u.or**(offset: `number`, ptr: `Expression`, value: `I32Expression`): `I32Expression`
* Module#i32.**atomic.rmw16_u.xor**(offset: `number`, ptr: `Expression`, value: `I32Expression`): `I32Expression`
* Module#i32.**atomic.rmw16_u.xchg**(offset: `number`, ptr: `Expression`, value: `I32Expression`): `I32Expression`
* Module#i32.**atomic.rmw16_u.cmpxchg**(offset: `number`, ptr: `Expression`, expected: `I32Expression`, replacement: `I32Expression`): `I32Expression`
>
* Module#i64.**atomic.rmw.add**(offset: `number`, ptr: `Expression`, value: `I64Expression`): `I64Expression`
* Module#i64.**atomic.rmw.sub**(offset: `number`, ptr: `Expression`, value: `I64Expression`): `I64Expression`
* Module#i64.**atomic.rmw.and**(offset: `number`, ptr: `Expression`, value: `I64Expression`): `I64Expression`
* Module#i64.**atomic.rmw.or**(offset: `number`, ptr: `Expression`, value: `I64Expression`): `I64Expression`
* Module#i64.**atomic.rmw.xor**(offset: `number`, ptr: `Expression`, value: `I64Expression`): `I64Expression`
* Module#i64.**atomic.rmw.xchg**(offset: `number`, ptr: `Expression`, value: `I64Expression`): `I64Expression`
* Module#i64.**atomic.rmw.cmpxchg**(offset: `number`, ptr: `Expression`, expected: `I64Expression`, replacement: `I64Expression`): `I64Expression`
* Module#i64.**atomic.rmw8_u.add**(offset: `number`, ptr: `Expression`, value: `I64Expression`): `I64Expression`
* Module#i64.**atomic.rmw8_u.sub**(offset: `number`, ptr: `Expression`, value: `I64Expression`): `I64Expression`
* Module#i64.**atomic.rmw8_u.and**(offset: `number`, ptr: `Expression`, value: `I64Expression`): `I64Expression`
* Module#i64.**atomic.rmw8_u.or**(offset: `number`, ptr: `Expression`, value: `I64Expression`): `I64Expression`
* Module#i64.**atomic.rmw8_u.xor**(offset: `number`, ptr: `Expression`, value: `I64Expression`): `I64Expression`
* Module#i64.**atomic.rmw8_u.xchg**(offset: `number`, ptr: `Expression`, value: `I64Expression`): `I64Expression`
* Module#i64.**atomic.rmw8_u.cmpxchg**(offset: `number`, ptr: `Expression`, expected: `I64Expression`, replacement: `I64Expression`): `I64Expression`
* Module#i64.**atomic.rmw16_u.add**(offset: `number`, ptr: `Expression`, value: `I64Expression`): `I64Expression`
* Module#i64.**atomic.rmw16_u.sub**(offset: `number`, ptr: `Expression`, value: `I64Expression`): `I64Expression`
* Module#i64.**atomic.rmw16_u.and**(offset: `number`, ptr: `Expression`, value: `I64Expression`): `I64Expression`
* Module#i64.**atomic.rmw16_u.or**(offset: `number`, ptr: `Expression`, value: `I64Expression`): `I64Expression`
* Module#i64.**atomic.rmw16_u.xor**(offset: `number`, ptr: `Expression`, value: `I64Expression`): `I64Expression`
* Module#i64.**atomic.rmw16_u.xchg**(offset: `number`, ptr: `Expression`, value: `I64Expression`): `I64Expression`
* Module#i64.**atomic.rmw16_u.cmpxchg**(offset: `number`, ptr: `Expression`, expected: `I64Expression`, replacement: `I64Expression`): `I64Expression`
* Module#i64.**atomic.rmw32_u.add**(offset: `number`, ptr: `Expression`, value: `I64Expression`): `I64Expression`
* Module#i64.**atomic.rmw32_u.sub**(offset: `number`, ptr: `Expression`, value: `I64Expression`): `I64Expression`
* Module#i64.**atomic.rmw32_u.and**(offset: `number`, ptr: `Expression`, value: `I64Expression`): `I64Expression`
* Module#i64.**atomic.rmw32_u.or**(offset: `number`, ptr: `Expression`, value: `I64Expression`): `I64Expression`
* Module#i64.**atomic.rmw32_u.xor**(offset: `number`, ptr: `Expression`, value: `I64Expression`): `I64Expression`
* Module#i64.**atomic.rmw32_u.xchg**(offset: `number`, ptr: `Expression`, value: `I64Expression`): `I64Expression`
* Module#i64.**atomic.rmw32_u.cmpxchg**(offset: `number`, ptr: `Expression`, expected: `I64Expression`, replacement: `I64Expression`): `I64Expression`

#### [Atomic wait and wake operations](https://github.com/WebAssembly/threads/blob/master/proposals/threads/Overview.md#wait-and-wake-operators) 🦄

* Module#i32.**wait**(ptr: `Expression`, expected: `I32Expression`, timeout: `I64Expression`): `I32Expression`
* Module#i64.**wait**(ptr: `Expression`, expected: `I64Expression`, timeout: `I64Expression`): `I32Expression`
* Module#**wake**(ptr: `Expression`, wakeCount: `I64Expression`): `I64Expression`

### Expression manipulation

* **getExpressionId**(expr: `Expression`): `ExpressionId`<br />
  Gets the id (kind) of the specified expression. Possible values are:

  * **InvalidId**: `ExpressionId`
  * **BlockId**: `ExpressionId`
  * **IfId**: `ExpressionId`
  * **LoopId**: `ExpressionId`
  * **BreakId**: `ExpressionId`
  * **SwitchId**: `ExpressionId`
  * **CallId**: `ExpressionId`
  * **CallImportId**: `ExpressionId`
  * **CallIndirectId**: `ExpressionId`
  * **GetLocalId**: `ExpressionId`
  * **SetLocalId**: `ExpressionId`
  * **GetGlobalId**: `ExpressionId`
  * **SetGlobalId**: `ExpressionId`
  * **LoadId**: `ExpressionId`
  * **StoreId**: `ExpressionId`
  * **ConstId**: `ExpressionId`
  * **UnaryId**: `ExpressionId`
  * **BinaryId**: `ExpressionId`
  * **SelectId**: `ExpressionId`
  * **DropId**: `ExpressionId`
  * **ReturnId**: `ExpressionId`
  * **HostId**: `ExpressionId`
  * **NopId**: `ExpressionId`
  * **UnreachableId**: `ExpressionId`
  * **AtomicCmpxchgId**: `ExpressionId`
  * **AtomicRMWId**: `ExpressionId`
  * **AtomicWaitId**: `ExpressionId`
  * **AtomicWakeId**: `ExpressionId`

* **getExpressionType**(expr: `Expression`): `Type`<br />
  Gets the type of the specified expression.

* **getConstValueI32**(expr: `Expression`): `number`<br />
  Gets the value of an i32.const (id=**ConstId**, type=**i32**) expression.

* **getConstValueI64**(expr: `Expression`): `{ low: number, high: number }`<br />
  Gets the value of an i64.const (id=**ConstId**, type=**i64**) expression.

* **getConstValueF32**(expr: `Expression`): `number`<br />
  Gets the value of an f32.const (id=**ConstId**, type=**f32**) expression.

* **getConstValueF64**(expr: `Expression`): `number`<br />
  Gets the value of an f64.const (id=**ConstId**, type=**f64**) expression.

* **getFunctionBody**(func: `Function`): `Expression`<br />
  Gets the body of a function.

### Relooper

* new **Relooper**(): `Relooper`<br />
  Constructs a relooper instance. This lets you provide an arbitrary CFG, and the relooper will structure it for WebAssembly.

* Relooper#**addBlock**(code: `Expression`): `RelooperBlock`<br />
  Adds a new block to the CFG, containing the provided code as its body.

* Relooper#**addBranch**(from: `RelooperBlock`, to: `RelooperBlock`, condition: `Expression`, code: `Expression`): `void`<br />
  Adds a branch from a block to another block, with a condition (or nothing, if this is the default branch to take from the origin - each block must have one such branch), and optional code to execute on the branch (useful for phis).

* Relooper#**addBlockWithSwitch**(code: `Expression`, condition: `Expression`): `RelooperBlock`<br />
  Adds a new block, which ends with a switch/br_table, with provided code and condition (that determines where we go in the switch).

* Relooper#**addBranchForSwitch**(from: `RelooperBlock`, to: `RelooperBlock`, indexes: `number[]`, code: `Expression`): `void`<br />
  Adds a branch from a block ending in a switch, to another block, using an array of indexes that determine where to go, and optional code to execute on the branch.

* Relooper#**renderAndDispose**(entry: `RelooperBlock`, labelHelper: `number`, module: `Module`): `Expression`<br />
  Renders and cleans up the Relooper instance. Call this after you have created all the blocks and branches, giving it the entry block (where control flow begins), a label helper variable (an index of a local we can use, necessary for irreducible control flow), and the module. This returns an expression - normal WebAssembly code - that you can use normally anywhere.

Building
--------

Clone the GitHub repository including submodules and install the development dependencies:

```
$> git clone --recursive https://github.com/AssemblyScript/binaryen.js.git
$> cd binaryen.js
$> npm install
```

Make sure [Emscripten](https://github.com/kripken/emscripten) is properly set up on your system.

Afterwards, to build the `binaryen` submodule to `index.js`, run:

```
$> npm run build
```

To run the [tests](./tests), do:

```
$> npm test
```

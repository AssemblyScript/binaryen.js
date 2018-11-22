binaryen.js
===========

**binaryen.js** is a port of [Binaryen](https://github.com/WebAssembly/binaryen) to the Web, allowing you to generate WebAssembly using a JavaScript API.

[![npm](https://img.shields.io/npm/v/binaryen.svg)](https://www.npmjs.com/package/binaryen) [![npm (tag)](https://img.shields.io/npm/v/binaryen/nightly.svg)](https://www.npmjs.com/package/binaryen) [![Build Status](https://travis-ci.org/AssemblyScript/binaryen.js.svg?branch=master)](https://travis-ci.org/AssemblyScript/binaryen.js)

Usage
-----

```
$> npm install binaryen
```

```js
var binaryen = require("binaryen");

// Create a module with a single function
var myModule = new binaryen.Module();

myModule.addFunction("add", myModule.addFunctionType("iii", binaryen.i32, [ binaryen.i32, binaryen.i32 ]), [ binaryen.i32 ],
  myModule.block(null, [
    myModule.setLocal(2,
      myModule.i32.add(
        myModule.getLocal(0, binaryen.i32),
        myModule.getLocal(1, binaryen.i32)
      )
    ),
    myModule.return(
      myModule.getLocal(2, binaryen.i32)
    )
  ])
);
myModule.addFunctionExport("add", "add");

// Optimize the module using default passes and levels
myModule.optimize();

// Validate the module
if (!myModule.validate())
  throw new Error("validation error");

// Generate text format and binary
var textData = myModule.emitText();
var wasmData = myModule.emitBinary();

// Example usage with the WebAssembly API
var compiled = new WebAssembly.Module(wasmData);
var instance = new WebAssembly.Instance(compiled, {});
console.log(instance.exports.add(41, 1));
```

The buildbot also publishes nightly versions once a day if there have been changes. The latest nightly can be installed through

```
$> npm install binaryen@nightly
```

or you can use one of the [previous versions](https://github.com/AssemblyScript/binaryen.js/tags) instead if necessary.

### Usage with a CDN

  * From GitHub via [jsDelivr](https://www.jsdelivr.com):<br />
    `https://cdn.jsdelivr.net/gh/AssemblyScript/binaryen.js@VERSION/index.js`
  * From npm via [jsDelivr](https://www.jsdelivr.com):<br />
    `https://cdn.jsdelivr.net/npm/binaryen@VERSION/index.js`
  * From npm via [UNPKG](https://unpkg.com):<br />
    `https://unpkg.com/binaryen@VERSION/index.js`

  Replace `VERSION` with a [specific version](https://github.com/AssemblyScript/binaryen.js/releases) or omit it (not recommended in production) to use master/latest.

API
---
<!-- START API.md -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
### Contents

- [Types](#types)
- [Module construction](#module-construction)
- [Module manipulation](#module-manipulation)
- [Module validation](#module-validation)
- [Module optimization](#module-optimization)
- [Module creation](#module-creation)
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
  - [Sign extension operations 🦄](#sign-extension-operations-)
- [Expression manipulation](#expression-manipulation)
- [Relooper](#relooper)
- [Source maps](#source-maps)
- [Debugging](#debugging)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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

 * **auto**: `Type`<br />
   Special type used in **Module#block** exclusively. Lets the API figure out a block's result type automatically.

 * **unreachable**: `Type`<br />
   Special type indicating unreachable code when obtaining information about an expression.

### Module construction

 * new **Module**(): `Module`<br />
   Constructs a new module.

 * **parseText**(text: `string`): `Module`<br />
   Creates a module from Binaryen's s-expression text format (not official stack-style text format).

 * **readBinary**(data: `Uint8Array`): `Module`<br />
   Creates a module from binary data.

 * **wrapModule**(ptr: `number`): `Module`<br />
   Wraps a module pointer as used with the underlying C-API as a JS module object.

### Module manipulation

* Module#**addFunctionType**(name: `string`, resultType: `Type`, paramTypes: `Type[]`): `Signature`<br />
  Adds a new function type.

* Module#**getFunctionTypeBySignature**(resultType: `Type`, paramTypes: `Type[]`): `Signature`<br />
  Gets an existing function type by its parametric signature. Returns `0` if there is no such function type.

* Module#**removeFunctionType**(name: `string`): `void`<br />
  Removes a function type.

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

* Module#**addFunctionExport**(internalName: `string`, externalName: `string`): `Export`<br />
  Adds a function export.

* Module#**addTableExport**(internalName: `string`, externalName: `string`): `Export`<br />
  Adds a table export. There's just one table for now, using name `"0"`.

* Module#**addMemoryExport**(internalName: `string`, externalName: `string`): `Export`<br />
  Adds a memory export. There's just one memory for now, using name `"0"`.

* Module#**addGlobalExport**(internalName: `string`, externalName: `string`): `Export`<br />
  Adds a global variable export. Exported globals must be immutable.

* Module#**addGlobal**(name: `string`, type: `Type`, mutable: `number`, value: `Expression`): `Global`<br />
  Adds a global instance variable.

* Module#**removeExport**(externalName: `string`): `void`<br />
  Removes an export, by external name.

* Module#**setFunctionTable**(initial: `number`, maximum: `number`, funcs: `string[]`): `void`<br />
  Sets the contents of the function table. There's just one table for now, using name `"0"`.

* Module#**setMemory**(initial: `number`, maximum: `number`, exportName: `string | null`, segments: `MemorySegment[]`): `void`<br />
  Sets the memory. There's just one memory for now, using name `"0"`. Providing `exportName` also creates a memory export.

* Module#**setStart**(start: `Function`): `void`<br />
  Sets the start function.

* Module#**autoDrop**(): `void`<br />
  Enables automatic insertion of `drop` operations where needed. Lets you not worry about dropping when creating your code.

* **getFunctionTypeInfo**(ftype: `FunctionType`: `FunctionTypeInfo`<br />
  Obtains information about a function type.

  * FunctionTypeInfo#**name**: `string | null`
  * FunctionTypeInfo#**params**: `Type[]`
  * FunctionTypeInfo#**result**: `Type`

* **getFunctionInfo**(ftype: `Function`: `FunctionInfo`<br />
  Obtains information about a function.

  * FunctionInfo#**name**: `string`
  * FunctionInfo#**module**: `string | null` (if imported)
  * FunctionInfo#**base**: `string | null` (if imported)
  * FunctionInfo#**type**: `FunctionType`
  * FunctionInfo#**params**: `Type[]`
  * FunctionInfo#**result**: `Type`
  * FunctionInfo#**vars**: `Type`
  * FunctionInfo#**body**: `Expression`

* **getGlobalInfo**(global: `Global`): `GlobalInfo`<br />
  Obtains information about an import, always including:

  * GlobalInfo#**name**: `string`
  * GlobalInfo#**module**: `string | null` (if imported)
  * GlobalInfo#**base**: `string | null` (if imported)
  * GlobalInfo#**type**: `Type`

* **getExportInfo**(export_: `Export`): `ExportInfo`<br />
  Obtains information about an export.

  * ExportInfo#**kind**: `ExternalKind`
  * ExportInfo#**name**: `string`
  * ExportInfo#**value**: `string`

  Possible `ExternalKind` values are:

  * **ExternalFunction**: `ExternalKind`
  * **ExternalTable**: `ExternalKind`
  * **ExternalMemory**: `ExternalKind`
  * **ExternalGlobal**: `ExternalKind`

### Module validation

* Module#**validate**(): `boolean`<br />
  Validates the module. Returns `true` if valid, otherwise prints validation errors and returns `false`.

### Module optimization

* Module#**optimize**(): `void`<br />
  Optimizes the module using the default optimization passes.

* Module#**optimizeFunction**(func: `Function | string`): `void`<br />
  Optimizes a single function using the default optimization passes.

* Module#**runPasses**(passes: `string[]`): `void`<br />
  Runs the specified passes on the module.

* Module#**runPassesOnFunction**(func: `Function | string`, passes: `string[]`): `void`<br />
  Runs the specified passes on a single function.

* **getOptimizeLevel**(): `number`<br />
  Gets the currently set optimize level. `0`, `1`, `2` correspond to `-O0`, `-O1`, `-O2` (default), etc.

* **setOptimizeLevel**(level: `number`): `void`<br />
  Sets the optimization level to use. `0`, `1`, `2` correspond to `-O0`, `-O1`, `-O2` (default), etc.

* **getShrinkLevel**(): `number`<br />
  Gets the currently set shrink level. `0`, `1`, `2` correspond to `-O0`, `-Os` (default), `-Oz`.

* **setShrinkLevel**(level: `number`): `void`<br />
  Sets the shrink level to use. `0`, `1`, `2` correspond to `-O0`, `-Os` (default), `-Oz`.

* **getDebugInfo**(): `boolean`<br />
  Gets whether generating debug information is currently enabled or not.

* **setDebugInfo**(on: `boolean`): `void`<br />
  Enables or disables debug information in emitted binaries.

### Module creation

* Module#**emitBinary**(): `Uint8Array`<br />
  Returns the module in binary format.

* Module#**emitBinary**(sourceMapUrl: `string | null`): `BinaryWithSourceMap`<br />
  Returns the module in binary format with its source map. If `sourceMapUrl` is `null`, source map generation is skipped.

  * BinaryWithSourceMap#**binary**: `Uint8Array`
  * BinaryWithSourceMap#**sourceMap**: `string | null`

* Module#**emitText**(): `string`<br />
  Returns the module in Binaryen's s-expression text format (not official stack-style text format).

* Module#**emitAsmjs**(): `string`<br />
  Returns the [asm.js](http://asmjs.org/) representation of the module.

* Module#**dispose**(): `void`<br />
  Releases the resources held by the module once it isn't needed anymore.

### Expression construction

#### [Control flow](http://webassembly.org/docs/semantics/#control-constructs-and-instructions)

* Module#**block**(label: `string | null`, children: `Expression[]`, resultType?: `Type`): `Expression`<br />
  Creates a block. `resultType` defaults to `none`.

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
  Creates a [select](http://webassembly.org/docs/semantics/#type-parametric-operators) of one of two values.

#### [Constants](http://webassembly.org/docs/semantics/#constants)

* Module#i32.**const**(value: `number`): `Expression`
>
* Module#i64.**const**(low: `number`, high: `number`): `Expression`
>
* Module#f32.**const**(value: `number`): `Expression`
* Module#f32.**const_bits**(value: `number`): `Expression`
>
* Module#f64.**const**(value: `number`): `Expression`
* Module#f64.**const_bits**(low: `number`, high: `number`): `Expression`

#### [Variable accesses](http://webassembly.org/docs/semantics/#local-variables)

* Module#**get_local/getLocal**(index: `number`, type: `Type`): `Expression`<br />
  Creates a get_local for the local at the specified index. Note that we must specify the type here as we may not have created the local being called yet.

* Module#**set_local/setLocal**(index: `number`, value: `Expression`): `Expression`<br />
  Creates a set_local for the local at the specified index.

* Module#**tee_local/teeLocal**(index: `number`, value: `Expression`): `Expression`<br />
  Creates a tee_local for the local at the specified index. A tee differs from a set in that the value remains on the stack.

* Module#**get_global/getGlobal**(name: `string`, type: `Type`): `Expression`<br />
  Creates a get_global for the global with the specified name. Note that we must specify the type here as we may not have created the global being called yet.

* Module#**set_global/setGlobal**(name: `string`, value: `Expression`): `Expression`<br />
  Creates a set_global for the global with the specified name.

#### [Integer operations](http://webassembly.org/docs/semantics/#32-bit-integer-operators)

* Module#i32.**clz**(value: `Expression`): `Expression`
* Module#i32.**ctz**(value: `Expression`): `Expression`
* Module#i32.**popcnt**(value: `Expression`): `Expression`
* Module#i32.**eqz**(value: `Expression`): `Expression`
* Module#i32.**add**(left: `Expression`, right: `Expression`): `Expression`
* Module#i32.**sub**(left: `Expression`, right: `Expression`): `Expression`
* Module#i32.**mul**(left: `Expression`, right: `Expression`): `Expression`
* Module#i32.**div_s**(left: `Expression`, right: `Expression`): `Expression`
* Module#i32.**div_u**(left: `Expression`, right: `Expression`): `Expression`
* Module#i32.**rem_s**(left: `Expression`, right: `Expression`): `Expression`
* Module#i32.**rem_u**(left: `Expression`, right: `Expression`): `Expression`
* Module#i32.**and**(left: `Expression`, right: `Expression`): `Expression`
* Module#i32.**or**(left: `Expression`, right: `Expression`): `Expression`
* Module#i32.**xor**(left: `Expression`, right: `Expression`): `Expression`
* Module#i32.**shl**(left: `Expression`, right: `Expression`): `Expression`
* Module#i32.**shr_u**(left: `Expression`, right: `Expression`): `Expression`
* Module#i32.**shr_s**(left: `Expression`, right: `Expression`): `Expression`
* Module#i32.**rotl**(left: `Expression`, right: `Expression`): `Expression`
* Module#i32.**rotr**(left: `Expression`, right: `Expression`): `Expression`
* Module#i32.**eq**(left: `Expression`, right: `Expression`): `Expression`
* Module#i32.**ne**(left: `Expression`, right: `Expression`): `Expression`
* Module#i32.**lt_s**(left: `Expression`, right: `Expression`): `Expression`
* Module#i32.**lt_u**(left: `Expression`, right: `Expression`): `Expression`
* Module#i32.**le_s**(left: `Expression`, right: `Expression`): `Expression`
* Module#i32.**le_u**(left: `Expression`, right: `Expression`): `Expression`
* Module#i32.**gt_s**(left: `Expression`, right: `Expression`): `Expression`
* Module#i32.**gt_u**(left: `Expression`, right: `Expression`): `Expression`
* Module#i32.**ge_s**(left: `Expression`, right: `Expression`): `Expression`
* Module#i32.**ge_u**(left: `Expression`, right: `Expression`): `Expression`
>
* Module#i64.**clz**(value: `Expression`): `Expression`
* Module#i64.**ctz**(value: `Expression`): `Expression`
* Module#i64.**popcnt**(value: `Expression`): `Expression`
* Module#i64.**eqz**(value: `Expression`): `Expression`
* Module#i64.**add**(left: `Expression`, right: `Expression`): `Expression`
* Module#i64.**sub**(left: `Expression`, right: `Expression`): `Expression`
* Module#i64.**mul**(left: `Expression`, right: `Expression`): `Expression`
* Module#i64.**div_s**(left: `Expression`, right: `Expression`): `Expression`
* Module#i64.**div_u**(left: `Expression`, right: `Expression`): `Expression`
* Module#i64.**rem_s**(left: `Expression`, right: `Expression`): `Expression`
* Module#i64.**rem_u**(left: `Expression`, right: `Expression`): `Expression`
* Module#i64.**and**(left: `Expression`, right: `Expression`): `Expression`
* Module#i64.**or**(left: `Expression`, right: `Expression`): `Expression`
* Module#i64.**xor**(left: `Expression`, right: `Expression`): `Expression`
* Module#i64.**shl**(left: `Expression`, right: `Expression`): `Expression`
* Module#i64.**shr_u**(left: `Expression`, right: `Expression`): `Expression`
* Module#i64.**shr_s**(left: `Expression`, right: `Expression`): `Expression`
* Module#i64.**rotl**(left: `Expression`, right: `Expression`): `Expression`
* Module#i64.**rotr**(left: `Expression`, right: `Expression`): `Expression`
* Module#i64.**eq**(left: `Expression`, right: `Expression`): `Expression`
* Module#i64.**ne**(left: `Expression`, right: `Expression`): `Expression`
* Module#i64.**lt_s**(left: `Expression`, right: `Expression`): `Expression`
* Module#i64.**lt_u**(left: `Expression`, right: `Expression`): `Expression`
* Module#i64.**le_s**(left: `Expression`, right: `Expression`): `Expression`
* Module#i64.**le_u**(left: `Expression`, right: `Expression`): `Expression`
* Module#i64.**gt_s**(left: `Expression`, right: `Expression`): `Expression`
* Module#i64.**gt_u**(left: `Expression`, right: `Expression`): `Expression`
* Module#i64.**ge_s**(left: `Expression`, right: `Expression`): `Expression`
* Module#i64.**ge_u**(left: `Expression`, right: `Expression`): `Expression`

#### [Floating point operations](http://webassembly.org/docs/semantics/#floating-point-operators)

* Module#f32.**neg**(value: `Expression`): `Expression`
* Module#f32.**abs**(value: `Expression`): `Expression`
* Module#f32.**ceil**(value: `Expression`): `Expression`
* Module#f32.**floor**(value: `Expression`): `Expression`
* Module#f32.**trunc**(value: `Expression`): `Expression`
* Module#f32.**nearest**(value: `Expression`): `Expression`
* Module#f32.**sqrt**(value: `Expression`): `Expression`
* Module#f32.**add**(left: `Expression`, right: `Expression`): `Expression`
* Module#f32.**sub**(left: `Expression`, right: `Expression`): `Expression`
* Module#f32.**mul**(left: `Expression`, right: `Expression`): `Expression`
* Module#f32.**div**(left: `Expression`, right: `Expression`): `Expression`
* Module#f32.**copysign**(left: `Expression`, right: `Expression`): `Expression`
* Module#f32.**min**(left: `Expression`, right: `Expression`): `Expression`
* Module#f32.**max**(left: `Expression`, right: `Expression`): `Expression`
* Module#f32.**eq**(left: `Expression`, right: `Expression`): `Expression`
* Module#f32.**ne**(left: `Expression`, right: `Expression`): `Expression`
* Module#f32.**lt**(left: `Expression`, right: `Expression`): `Expression`
* Module#f32.**le**(left: `Expression`, right: `Expression`): `Expression`
* Module#f32.**gt**(left: `Expression`, right: `Expression`): `Expression`
* Module#f32.**ge**(left: `Expression`, right: `Expression`): `Expression`
>
* Module#f64.**neg**(value: `Expression`): `Expression`
* Module#f64.**abs**(value: `Expression`): `Expression`
* Module#f64.**ceil**(value: `Expression`): `Expression`
* Module#f64.**floor**(value: `Expression`): `Expression`
* Module#f64.**trunc**(value: `Expression`): `Expression`
* Module#f64.**nearest**(value: `Expression`): `Expression`
* Module#f64.**sqrt**(value: `Expression`): `Expression`
* Module#f64.**add**(left: `Expression`, right: `Expression`): `Expression`
* Module#f64.**sub**(left: `Expression`, right: `Expression`): `Expression`
* Module#f64.**mul**(left: `Expression`, right: `Expression`): `Expression`
* Module#f64.**div**(left: `Expression`, right: `Expression`): `Expression`
* Module#f64.**copysign**(left: `Expression`, right: `Expression`): `Expression`
* Module#f64.**min**(left: `Expression`, right: `Expression`): `Expression`
* Module#f64.**max**(left: `Expression`, right: `Expression`): `Expression`
* Module#f64.**eq**(left: `Expression`, right: `Expression`): `Expression`
* Module#f64.**ne**(left: `Expression`, right: `Expression`): `Expression`
* Module#f64.**lt**(left: `Expression`, right: `Expression`): `Expression`
* Module#f64.**le**(left: `Expression`, right: `Expression`): `Expression`
* Module#f64.**gt**(left: `Expression`, right: `Expression`): `Expression`
* Module#f64.**ge**(left: `Expression`, right: `Expression`): `Expression`

#### [Datatype conversions](http://webassembly.org/docs/semantics/#datatype-conversions-truncations-reinterpretations-promotions-and-demotions)

* Module#i32.**trunc_s.f32**(value: `Expression`): `Expression`
* Module#i32.**trunc_s.f64**(value: `Expression`): `Expression`
* Module#i32.**trunc_u.f32**(value: `Expression`): `Expression`
* Module#i32.**trunc_u.f64**(value: `Expression`): `Expression`
* Module#i32.**reinterpret**(value: `Expression`): `Expression`
* Module#i32.**wrap**(value: `Expression`): `Expression`
>
* Module#i64.**trunc_s.f32**(value: `Expression`): `Expression`
* Module#i64.**trunc_s.f64**(value: `Expression`): `Expression`
* Module#i64.**trunc_u.f32**(value: `Expression`): `Expression`
* Module#i64.**trunc_u.f64**(value: `Expression`): `Expression`
* Module#i64.**reinterpret**(value: `Expression`): `Expression`
* Module#i64.**extend_s**(value: `Expression`): `Expression`
* Module#i64.**extend_u**(value: `Expression`): `Expression`
>
* Module#f32.**reinterpret**(value: `Expression`): `Expression`
* Module#f32.**convert_s.i32**(value: `Expression`): `Expression`
* Module#f32.**convert_s.i64**(value: `Expression`): `Expression`
* Module#f32.**convert_u.i32**(value: `Expression`): `Expression`
* Module#f32.**convert_u.i64**(value: `Expression`): `Expression`
* Module#f32.**demote**(value: `Expression`): `Expression`
>
* Module#f64.**reinterpret**(value: `Expression`): `Expression`
* Module#f64.**convert_s.i32**(value: `Expression`): `Expression`
* Module#f64.**convert_s.i64**(value: `Expression`): `Expression`
* Module#f64.**convert_u.i32**(value: `Expression`): `Expression`
* Module#f64.**convert_u.i64**(value: `Expression`): `Expression`
* Module#f64.**promote**(value: `Expression`): `Expression`

#### [Function calls](http://webassembly.org/docs/semantics/#calls)

* Module#**call**(name: `string`, operands: `Expression[]`, returnType: `Type`): `Expression`<br />
  Creates a call to a function. Note that we must specify the return type here as we may not have created the function being called yet.

* Module#**call_indirect/callIndirect**(target: `Expression`, operands: `Expression[]`, returnType: `Type`): `Expression`<br />
  Similar to **call**, but calls indirectly, i.e., via a function pointer, so an expression replaces the name as the called value.

#### [Linear memory accesses](http://webassembly.org/docs/semantics/#linear-memory-accesses)

* Module#i32.**load**(offset: `number`, align: `number`, ptr: `Expression`): `Expression`<br />
* Module#i32.**load8_s**(offset: `number`, align: `number`, ptr: `Expression`): `Expression`<br />
* Module#i32.**load8_u**(offset: `number`, align: `number`, ptr: `Expression`): `Expression`<br />
* Module#i32.**load16_s**(offset: `number`, align: `number`, ptr: `Expression`): `Expression`<br />
* Module#i32.**load16_u**(offset: `number`, align: `number`, ptr: `Expression`): `Expression`<br />
* Module#i32.**store**(offset: `number`, align: `number`, ptr: `Expression`, value: `Expression`): `Expression`<br />
* Module#i32.**store8**(offset: `number`, align: `number`, ptr: `Expression`, value: `Expression`): `Expression`<br />
* Module#i32.**store16**(offset: `number`, align: `number`, ptr: `Expression`, value: `Expression`): `Expression`<br />
>
* Module#i64.**load**(offset: `number`, align: `number`, ptr: `Expression`): `Expression`
* Module#i64.**load8_s**(offset: `number`, align: `number`, ptr: `Expression`): `Expression`
* Module#i64.**load8_u**(offset: `number`, align: `number`, ptr: `Expression`): `Expression`
* Module#i64.**load16_s**(offset: `number`, align: `number`, ptr: `Expression`): `Expression`
* Module#i64.**load16_u**(offset: `number`, align: `number`, ptr: `Expression`): `Expression`
* Module#i64.**load32_s**(offset: `number`, align: `number`, ptr: `Expression`): `Expression`
* Module#i64.**load32_u**(offset: `number`, align: `number`, ptr: `Expression`): `Expression`
* Module#i64.**store**(offset: `number`, align: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i64.**store8**(offset: `number`, align: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i64.**store16**(offset: `number`, align: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i64.**store32**(offset: `number`, align: `number`, ptr: `Expression`, value: `Expression`): `Expression`
>
* Module#f32.**load**(offset: `number`, align: `number`, ptr: `Expression`): `Expression`
* Module#f32.**store**(offset: `number`, align: `number`, ptr: `Expression`, value: `Expression`): `Expression`
>
* Module#f64.**load**(offset: `number`, align: `number`, ptr: `Expression`): `Expression`
* Module#f64.**store**(offset: `number`, align: `number`, ptr: `Expression`, value: `Expression`): `Expression`

#### [Host operations](http://webassembly.org/docs/semantics/#resizing)

* Module#**current_memory/currentMemory**(): `Expression`
* Module#**grow_memory/growMemory**(value: `number`): `Expression`

#### [Atomic memory accesses](https://github.com/WebAssembly/threads/blob/master/proposals/threads/Overview.md#atomic-memory-accesses) 🦄

* Module#i32.**atomic.load**(offset: `number`, ptr: `Expression`): `Expression`
* Module#i32.**atomic.load8_u**(offset: `number`, ptr: `Expression`): `Expression`
* Module#i32.**atomic.load16_u**(offset: `number`, ptr: `Expression`): `Expression`
* Module#i32.**atomic.store**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i32.**atomic.store8**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i32.**atomic.store16**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
>
* Module#i64.**atomic.load**(offset: `number`, ptr: `Expression`): `Expression`
* Module#i64.**atomic.load8_u**(offset: `number`, ptr: `Expression`): `Expression`
* Module#i64.**atomic.load16_u**(offset: `number`, ptr: `Expression`): `Expression`
* Module#i64.**atomic.load32_u**(offset: `number`, ptr: `Expression`): `Expression`
* Module#i64.**atomic.store**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i64.**atomic.store8**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i64.**atomic.store16**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i64.**atomic.store32**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`

#### [Atomic read-modify-write operations](https://github.com/WebAssembly/threads/blob/master/proposals/threads/Overview.md#read-modify-write) 🦄

* Module#i32.**atomic.rmw.add**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i32.**atomic.rmw.sub**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i32.**atomic.rmw.and**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i32.**atomic.rmw.or**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i32.**atomic.rmw.xor**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i32.**atomic.rmw.xchg**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i32.**atomic.rmw.cmpxchg**(offset: `number`, ptr: `Expression`, expected: `Expression`, replacement: `Expression`): `Expression`
* Module#i32.**atomic.rmw8_u.add**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i32.**atomic.rmw8_u.sub**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i32.**atomic.rmw8_u.and**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i32.**atomic.rmw8_u.or**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i32.**atomic.rmw8_u.xor**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i32.**atomic.rmw8_u.xchg**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i32.**atomic.rmw8_u.cmpxchg**(offset: `number`, ptr: `Expression`, expected: `Expression`, replacement: `Expression`): `Expression`
* Module#i32.**atomic.rmw16_u.add**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i32.**atomic.rmw16_u.sub**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i32.**atomic.rmw16_u.and**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i32.**atomic.rmw16_u.or**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i32.**atomic.rmw16_u.xor**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i32.**atomic.rmw16_u.xchg**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i32.**atomic.rmw16_u.cmpxchg**(offset: `number`, ptr: `Expression`, expected: `Expression`, replacement: `Expression`): `Expression`
>
* Module#i64.**atomic.rmw.add**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i64.**atomic.rmw.sub**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i64.**atomic.rmw.and**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i64.**atomic.rmw.or**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i64.**atomic.rmw.xor**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i64.**atomic.rmw.xchg**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i64.**atomic.rmw.cmpxchg**(offset: `number`, ptr: `Expression`, expected: `Expression`, replacement: `Expression`): `Expression`
* Module#i64.**atomic.rmw8_u.add**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i64.**atomic.rmw8_u.sub**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i64.**atomic.rmw8_u.and**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i64.**atomic.rmw8_u.or**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i64.**atomic.rmw8_u.xor**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i64.**atomic.rmw8_u.xchg**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i64.**atomic.rmw8_u.cmpxchg**(offset: `number`, ptr: `Expression`, expected: `Expression`, replacement: `Expression`): `Expression`
* Module#i64.**atomic.rmw16_u.add**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i64.**atomic.rmw16_u.sub**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i64.**atomic.rmw16_u.and**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i64.**atomic.rmw16_u.or**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i64.**atomic.rmw16_u.xor**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i64.**atomic.rmw16_u.xchg**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i64.**atomic.rmw16_u.cmpxchg**(offset: `number`, ptr: `Expression`, expected: `Expression`, replacement: `Expression`): `Expression`
* Module#i64.**atomic.rmw32_u.add**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i64.**atomic.rmw32_u.sub**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i64.**atomic.rmw32_u.and**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i64.**atomic.rmw32_u.or**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i64.**atomic.rmw32_u.xor**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i64.**atomic.rmw32_u.xchg**(offset: `number`, ptr: `Expression`, value: `Expression`): `Expression`
* Module#i64.**atomic.rmw32_u.cmpxchg**(offset: `number`, ptr: `Expression`, expected: `Expression`, replacement: `Expression`): `Expression`

#### [Atomic wait and wake operations](https://github.com/WebAssembly/threads/blob/master/proposals/threads/Overview.md#wait-and-wake-operators) 🦄

* Module#i32.**wait**(ptr: `Expression`, expected: `Expression`, timeout: `Expression`): `Expression`
* Module#i64.**wait**(ptr: `Expression`, expected: `Expression`, timeout: `Expression`): `Expression`
* Module#**wake**(ptr: `Expression`, wakeCount: `Expression`): `Expression`

#### [Sign extension operations](https://github.com/WebAssembly/sign-extension-ops/blob/master/proposals/sign-extension-ops/Overview.md) 🦄

* Module#i32.**extend8_s**(value: `Expression`): `Expression`
* Module#i32.**extend16_s**(value: `Expression`): `Expression`
>
* Module#i64.**extend8_s**(value: `Expression`): `Expression`
* Module#i64.**extend16_s**(value: `Expression`): `Expression`
* Module#i64.**extend32_s**(value: `Expression`): `Expression`

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

* **getExpressionInfo**(expr: `Expression`: `ExpressionInfo`<br />
  Obtains information about an expression, always including:

  * Info#**id**: `ExpressionId`
  * Info#**type**: `Type`

  Additional properties depend on the expression's `id` and are usually equivalent to the respective parameters when creating such an expression:

  * BlockInfo#**name**: `string`
  * BlockInfo#**children**: `Expression[]`
  >
  * IfInfo#**condition**: `Expression`
  * IfInfo#**ifTrue**: `Expression`
  * IfInfo#**ifFalse**: `Expression | null`
  >
  * LoopInfo#**name**: `string`
  * LoopInfo#**body**: `Expression`
  >
  * BreakInfo#**name**: `string`
  * BreakInfo#**condition**: `Expression | null`
  * BreakInfo#**value**: `Expression | null`
  >
  * SwitchInfo#**names**: `string[]`
  * SwitchInfo#**defaultName**: `string | null`
  * SwitchInfo#**condition**: `Expression`
  * SwitchInfo#**value**: `Expression | null`
  >
  * CallInfo#**target**: `string`
  * CallInfo#**operands**: `Expression[]`
  >
  * CallImportInfo#**target**: `string`
  * CallImportInfo#**operands**: `Expression[]`
  >
  * CallIndirectInfo#**target**: `Expression`
  * CallIndirectInfo#**operands**: `Expression[]`
  >
  * GetLocalInfo#**index**: `number`
  >
  * SetLocalInfo#**isTee**: `boolean`
  * SetLocalInfo#**index**: `number`
  * SetLocalInfo#**value**: `Expression`
  >
  * GetGlobalInfo#**name**: `string`
  >
  * SetGlobalInfo#**name**: `string`
  * SetGlobalValue#**value**: `Expression`
  >
  * LoadInfo#**isAtomic**: `boolean`
  * LoadInfo#**isSigned**: `boolean`
  * LoadInfo#**offset**: `number`
  * LoadInfo#**bytes**: `number`
  * LoadInfo#**align**: `number`
  * LoadInfo#**ptr**: `Expression`
  >
  * StoreInfo#**isAtomic**: `boolean`
  * StoreInfo#**offset**: `number`
  * StoreInfo#**bytes**: `number`
  * StoreInfo#**align**: `number`
  * StoreInfo#**ptr**: `Expression`
  * StoreInfo#**value**: `Expression`
  >
  * ConstInfo#**value**: `number | { low: number, high: number }`
  >
  * UnaryInfo#**op**: `number`
  * UnaryInfo#**value**: `Expression`
  >
  * BinaryInfo#**op**: `number`
  * BinaryInfo#**left**: `Expression`
  * BinaryInfo#**right**: `Expression`
  >
  * SelectInfo#**ifTrue**: `Expression`
  * SelectInfo#**ifFalse**: `Expression`
  * SelectInfo#**condition**: `Expression`
  >
  * DropInfo#**value**: `Expression`
  >
  * ReturnInfo#**value**: `Expression | null`
  >
  * HostInfo#**op**: `number`
  * HostInfo#**nameOperand**: `string | null`
  * HostInfo#**operands**: `Expression[]`
  >
  * AtomicRMWInfo#**op**: `number`
  * AtomicRMWInfo#**bytes**: `number`
  * AtomicRMWInfo#**offset**: `number`
  * AtomicRMWInfo#**ptr**: `Expression`
  * AtomicRMWInfo#**value**: `Expression`
  >
  * AtomicCmpxchgInfo#**bytes**: `number`
  * AtomicCmpxchgInfo#**offset**: `number`
  * AtomicCmpxchgInfo#**ptr**: `Expression`
  * AtomicCmpxchgInfo#**expected**: `Expression`
  * AtomicCmpxchgInfo#**replacement**: `Expression`
  >
  * AtomicWaitInfo#**ptr**: `Expression`
  * AtomicWaitInfo#**expected**: `Expression`
  * AtomicWaitInfo#**timeout**: `Expression`
  * AtomicWaitInfo#**expectedType**: `Type`
  >
  * AtomicWakeInfo#**ptr**: `Expression`
  * AtomicWakeInfo#**wakeCount**: `Expression`

  NopInfo and UnreachableInfo do not include any additional properties.

### Relooper

* new **Relooper**(module: `Module`): `Relooper`<br />
  Constructs a relooper instance. This lets you provide an arbitrary CFG, and the relooper will structure it for WebAssembly.

* Relooper#**addBlock**(code: `Expression`): `RelooperBlock`<br />
  Adds a new block to the CFG, containing the provided code as its body.

* Relooper#**addBranch**(from: `RelooperBlock`, to: `RelooperBlock`, condition: `Expression`, code: `Expression`): `void`<br />
  Adds a branch from a block to another block, with a condition (or nothing, if this is the default branch to take from the origin - each block must have one such branch), and optional code to execute on the branch (useful for phis).

* Relooper#**addBlockWithSwitch**(code: `Expression`, condition: `Expression`): `RelooperBlock`<br />
  Adds a new block, which ends with a switch/br_table, with provided code and condition (that determines where we go in the switch).

* Relooper#**addBranchForSwitch**(from: `RelooperBlock`, to: `RelooperBlock`, indexes: `number[]`, code: `Expression`): `void`<br />
  Adds a branch from a block ending in a switch, to another block, using an array of indexes that determine where to go, and optional code to execute on the branch.

* Relooper#**renderAndDispose**(entry: `RelooperBlock`, labelHelper: `number`): `Expression`<br />
  Renders and cleans up the Relooper instance. Call this after you have created all the blocks and branches, giving it the entry block (where control flow begins) and a label helper variable (an index of a local we can use, necessary for irreducible control flow). This returns an expression - normal WebAssembly code - that you can use normally anywhere.

### Source maps

* Module#**addDebugInfoFileName**(filename: `string`): `number`<br />
  Adds a debug info file name to the module and returns its index.

* Module#**getDebugInfoFileName**(index: `number`): `string | null` <br />
  Gets the name of the debug info file at the specified index.

* Module#**setDebugLocation**(func: `Function`, expr: `Expression`, fileIndex: `number`, lineNumber: `number`, columnNumber: `number`): `void`<br />
  Sets the debug location of the specified `Expression` within the specified `Function`.

### Debugging

* Module#**setAPITracing**(on: `boolean`): `void`<br />
  Enables tracing of the C-API in the console. Can be very useful when filing bug reports.

* Module#**interpret**(): `void`<br />
  Runs the module in the interpreter, calling the start function.

<!-- END API.md -->

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

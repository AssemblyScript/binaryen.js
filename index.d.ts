declare module binaryen {

  const none: Type;
  const i32: Type;
  const i64: Type;
  const f32: Type;
  const f64: Type;

  interface I32Operations {
    load(offset: number, align: number, ptr: Expression): I32Expression;
    load8_s(offset: number, align: number, ptr: Expression): I32Expression;
    load8_u(offset: number, align: number, ptr: Expression): I32Expression;
    load16_s(offset: number, align: number, ptr: Expression): I32Expression;
    load16_u(offset: number, align: number, ptr: Expression): I32Expression;
    store(offset: number, align: number, ptr: Expression, value: I32Expression): I32Expression;
    store8(offset: number, align: number, ptr: Expression, value: I32Expression): I32Expression;
    store16(offset: number, align: number, ptr: Expression, value: I32Expression): I32Expression;
    const(value: number): I32Expression;
    clz(value: I32Expression): I32Expression;
    ctz(value: I32Expression): I32Expression;
    popcnt(value: I32Expression): I32Expression;
    eqz(value: I32Expression): I32Expression;
    trunc_s: {
      f32(value: F32Expression): I32Expression;
      f64(value: F64Expression): I32Expression;
    };
    trunc_u: {
      f32(value: F32Expression): I32Expression;
      f64(value: F64Expression): I32Expression;
    }
    reinterpret(value: F32Expression): I32Expression;
    wrap(value: I64Expression): I32Expression;
    add(left: I32Expression, right: I32Expression): I32Expression;
    sub(left: I32Expression, right: I32Expression): I32Expression;
    mul(left: I32Expression, right: I32Expression): I32Expression;
    div_s(left: I32Expression, right: I32Expression): I32Expression;
    div_u(left: I32Expression, right: I32Expression): I32Expression;
    rem_s(left: I32Expression, right: I32Expression): I32Expression;
    rem_u(left: I32Expression, right: I32Expression): I32Expression;
    and(left: I32Expression, right: I32Expression): I32Expression;
    or(left: I32Expression, right: I32Expression): I32Expression;
    xor(left: I32Expression, right: I32Expression): I32Expression;
    shl(left: I32Expression, right: I32Expression): I32Expression;
    shr_u(left: I32Expression, right: I32Expression): I32Expression;
    shr_s(left: I32Expression, right: I32Expression): I32Expression;
    rotl(left: I32Expression, right: I32Expression): I32Expression;
    rotr(left: I32Expression, right: I32Expression): I32Expression;
    eq(left: I32Expression, right: I32Expression): I32Expression;
    ne(left: I32Expression, right: I32Expression): I32Expression;
    lt_s(left: I32Expression, right: I32Expression): I32Expression;
    lt_u(left: I32Expression, right: I32Expression): I32Expression;
    le_s(left: I32Expression, right: I32Expression): I32Expression;
    le_u(left: I32Expression, right: I32Expression): I32Expression;
    gt_s(left: I32Expression, right: I32Expression): I32Expression;
    gt_u(left: I32Expression, right: I32Expression): I32Expression;
    ge_s(left: I32Expression, right: I32Expression): I32Expression;
    ge_u(left: I32Expression, right: I32Expression): I32Expression;
  }

  interface I64Operations {
    load(offset: number, align: number, ptr: Expression): I64Expression;
    load8_s(offset: number, align: number, ptr: Expression): I64Expression;
    load8_u(offset: number, align: number, ptr: Expression): I64Expression;
    load16_s(offset: number, align: number, ptr: Expression): I64Expression;
    load16_u(offset: number, align: number, ptr: Expression): I64Expression;
    load32_s(offset: number, align: number, ptr: Expression): I64Expression;
    load32_u(offset: number, align: number, ptr: Expression): I64Expression;
    store(offset: number, align: number, ptr: Expression, value: I64Expression): I64Expression;
    store8(offset: number, align: number, ptr: Expression, value: I64Expression): I64Expression;
    store16(offset: number, align: number, ptr: Expression, value: I64Expression): I64Expression;
    store32(offset: number, align: number, ptr: Expression, value: I64Expression): I64Expression;
    const(low: number, high: number): I64Expression;
    clz(value: I64Expression): I64Expression;
    ctz(value: I64Expression): I64Expression;
    popcnt(value: I64Expression): I64Expression;
    eqz(value: I64Expression): I64Expression;
    trunc_s: {
      f32(value: F32Expression): I64Expression;
      f64(value: F64Expression): I64Expression;
    };
    trunc_u: {
      f32(value: F32Expression): I64Expression;
      f64(value: F64Expression): I64Expression;
    }
    reinterpret(value: F64Expression): I64Expression;
    extend_s(value: I32Expression): I64Expression;
    extend_u(value: I32Expression): I64Expression;
    add(left: I64Expression, right: I64Expression): I64Expression;
    sub(left: I64Expression, right: I64Expression): I64Expression;
    mul(left: I64Expression, right: I64Expression): I64Expression;
    div_s(left: I64Expression, right: I64Expression): I64Expression;
    div_u(left: I64Expression, right: I64Expression): I64Expression;
    rem_s(left: I64Expression, right: I64Expression): I64Expression;
    rem_u(left: I64Expression, right: I64Expression): I64Expression;
    and(left: I64Expression, right: I64Expression): I64Expression;
    or(left: I64Expression, right: I64Expression): I64Expression;
    xor(left: I64Expression, right: I64Expression): I64Expression;
    shl(left: I64Expression, right: I64Expression): I64Expression;
    shr_u(left: I64Expression, right: I64Expression): I64Expression;
    shr_s(left: I64Expression, right: I64Expression): I64Expression;
    rotl(left: I64Expression, right: I64Expression): I64Expression;
    rotr(left: I64Expression, right: I64Expression): I64Expression;
    eq(left: I64Expression, right: I64Expression): I64Expression;
    ne(left: I64Expression, right: I64Expression): I64Expression;
    lt_s(left: I64Expression, right: I64Expression): I64Expression;
    lt_u(left: I64Expression, right: I64Expression): I64Expression;
    le_s(left: I64Expression, right: I64Expression): I64Expression;
    le_u(left: I64Expression, right: I64Expression): I64Expression;
    gt_s(left: I64Expression, right: I64Expression): I64Expression;
    gt_u(left: I64Expression, right: I64Expression): I64Expression;
    ge_s(left: I64Expression, right: I64Expression): I64Expression;
    ge_u(left: I64Expression, right: I64Expression): I64Expression;
  }

  interface F32Operations {
    load(offset: number, align: number, ptr: Expression): F32Expression;
    store(offset: number, align: number, ptr: Expression, value: F32Expression): F32Expression;
    const(value: number): F32Expression;
    const_bits(value: number): F32Expression;
    neg(value: F32Expression): F32Expression;
    abs(value: F32Expression): F32Expression;
    ceil(value: F32Expression): F32Expression;
    floor(value: F32Expression): F32Expression;
    trunc(value: F32Expression): F32Expression;
    nearest(value: F32Expression): F32Expression;
    sqrt(value: F32Expression): F32Expression;
    reinterpret(value: I32Expression): F32Expression;
    convert_s: {
      i32(value: I32Expression): F32Expression;
      i64(value: I64Expression): F32Expression;
    };
    convert_u: {
      i32(value: I32Expression): F32Expression;
      i64(value: I64Expression): F32Expression;
    };
    demote(value: F64Expression): F32Expression;
    add(left: F32Expression, right: F32Expression): F32Expression;
    sub(left: F32Expression, right: F32Expression): F32Expression;
    mul(left: F32Expression, right: F32Expression): F32Expression;
    div(left: F32Expression, right: F32Expression): F32Expression;
    copysign(left: F32Expression, right: F32Expression): F32Expression;
    min(left: F32Expression, right: F32Expression): F32Expression;
    max(left: F32Expression, right: F32Expression): F32Expression;
    eq(left: F32Expression, right: F32Expression): F32Expression;
    ne(left: F32Expression, right: F32Expression): F32Expression;
    lt(left: F32Expression, right: F32Expression): F32Expression;
    le(left: F32Expression, right: F32Expression): F32Expression;
    gt(left: F32Expression, right: F32Expression): F32Expression;
    ge(left: F32Expression, right: F32Expression): F32Expression;
  }

  interface F64Operations {
    load(offset: number, align: number, ptr: Expression): F64Expression;
    store(offset: number, align: number, ptr: Expression, value: F32Expression): F64Expression;
    const(value: number): F64Expression;
    const_bits(low: number, high: number): F64Expression;
    neg(value: F64Expression): F64Expression;
    abs(value: F64Expression): F64Expression;
    ceil(value: F64Expression): F64Expression;
    floor(value: F64Expression): F64Expression;
    trunc(value: F64Expression): F64Expression;
    nearest(value: F64Expression): F64Expression;
    sqrt(value: F64Expression): F64Expression;
    reinterpret(value: I32Expression): F64Expression;
    convert_s: {
      i32(value: I32Expression): F64Expression;
      i64(value: I64Expression): F64Expression;
    };
    convert_u: {
      i32(value: I32Expression): F64Expression;
      i64(value: I64Expression): F64Expression;
    };
    promote(value: F32Expression): F64Expression;
    add(left: F64Expression, right: F64Expression): F64Expression;
    sub(left: F64Expression, right: F64Expression): F64Expression;
    mul(left: F64Expression, right: F64Expression): F64Expression;
    div(left: F64Expression, right: F64Expression): F64Expression;
    copysign(left: F64Expression, right: F64Expression): F64Expression;
    min(left: F64Expression, right: F64Expression): F64Expression;
    max(left: F64Expression, right: F64Expression): F64Expression;
    eq(left: F64Expression, right: F64Expression): F64Expression;
    ne(left: F64Expression, right: F64Expression): F64Expression;
    lt(left: F64Expression, right: F64Expression): F64Expression;
    le(left: F64Expression, right: F64Expression): F64Expression;
    gt(left: F64Expression, right: F64Expression): F64Expression;
    ge(left: F64Expression, right: F64Expression): F64Expression;
  }

  interface MemorySegment {
    offset: I32Expression;
    data: Uint8Array;
  }

  class Module {

    addFunctionType(name: string, resultType: Type, paramTypes: Type[]): Signature;
    getFunctionTypeBySignature(resultType: Type, paramTypes: Type[]): Signature;
    addFunction(name: string, functionType: Signature, varTypes: Type[], body: Statement): binaryen.Function;
    addGlobal(name: string, type: Type, mutable: boolean, init: Expression): Expression;
    addImport(internalName: string, externalModuleName: string, externalBaseName: string, functionType?: Signature): void;
    removeImport(internalName: string): void;
    addExport(internalName: string, externalName: string): void;
    removeExport(externalName: string): void;
    setFunctionTable(funcs: number[]): void;
    setMemory(initial: number, maximum: number, exportName?: string, segments?: MemorySegment[]): void;
    setStart(start: binaryen.Function): void;

    emitBinary(): Uint8Array;
    emitText(): string;
    emitAsmjs(): string;
    validate(): number;
    optimize(): void;
    autoDrop(): void;
    interpret(): void;
    dispose(): void;

    i32: I32Operations;
    i64: I64Operations;
    f32: F32Operations;
    f64: F64Operations;

    block(label: string, children: Statement[], type?: Type): Statement;
    if(condition: I32Expression, ifTrue: Statement, ifFalse?: Statement): Statement;
    loop(label: string, body: Statement): Statement;
    break(label: string, condition?: I32Expression, value?: I32Expression): Statement;
    switch(labels: string[], defaultLabel: string, condition: I32Expression, value?: I32Expression): Statement;
    call(name: string, operands: Expression[], type: Type): Expression;
    callImport(name: string, operands: Expression[], type: Type): Expression;
    callIndirect(target: I32Expression, operands: Expression[], type: Type): Expression;
    getLocal(index: number, type: Type): Expression;
    setLocal(index: number, value: Expression): Statement;
    teeLocal(index: number, value: Expression): Expression;
    getGlobal(name: string, type: Type): Expression;
    setGlobal(name: string, value: Expression): Expression;
    select(condition: I32Expression, ifTrue: Expression, ifFalse: Expression): Expression;
    drop(value: Expression): Statement;
    return(value?: Expression): Statement;
    nop(): Statement;
    growMemory(value: Expression): Expression;
    currentMemory(): Expression;
    unreachable(): Statement;

  }

  function readBinary(data: Uint8Array): Module;
  function parseText(text: string): Module;
  function emitText(expression: Expression): string;
  function setAPITracing(on: boolean): void;

  class Relooper {
    addBlock(expression: Expression): RelooperBlock;
    addBranch(from: RelooperBlock, to: RelooperBlock, condition: Expression, code: Expression): void;
    addBlockWithSwitch(code: Expression, condition: Expression): RelooperBlock;
    addBranchForSwitch(from: RelooperBlock, to: RelooperBlock, indexes: number[], code: Expression): void;
    renderAndDispose(entry: RelooperBlock, labelHelper: number, module: Module): Expression;
  }

  // These are actually pointers internally
  abstract class Type {}
  abstract class Statement {}
  abstract class Signature {}
  abstract class Function {}
  abstract class Expression {}
  abstract class I32Expression extends Expression {}
  abstract class I64Expression extends Expression {}
  abstract class F32Expression extends Expression {}
  abstract class F64Expression extends Expression {}
  abstract class RelooperBlock {}
}

export = binaryen;

declare module binaryen {

  const none: Type;
  const i32: Type;
  const i64: Type;
  const f32: Type;
  const f64: Type;
  const unreachable: Type;
  const auto: Type;

  const InvalidId: ExpressionId;
  const BlockId: ExpressionId;
  const IfId: ExpressionId;
  const LoopId: ExpressionId;
  const BreakId: ExpressionId;
  const SwitchId: ExpressionId;
  const CallId: ExpressionId;
  const CallImportId: ExpressionId;
  const CallIndirectId: ExpressionId;
  const GetLocalid: ExpressionId;
  const SetLocalId: ExpressionId;
  const GetGlobalId: ExpressionId;
  const SetGlobalId: ExpressionId;
  const LoadId: ExpressionId;
  const StoreId: ExpressionId;
  const ConstId: ExpressionId;
  const UnaryId: ExpressionId;
  const BinaryId: ExpressionId;
  const SelectId: ExpressionId;
  const DropId: ExpressionId;
  const ReturnId: ExpressionId;
  const HostId: ExpressionId;
  const NopId: ExpressionId;
  const UnreachableId: ExpressionId;
  const AtomicCmpxchgId: ExpressionId;
  const AtomicRMWId: ExpressionId;
  const AtomicWaitId: ExpressionId;
  const AtomicWakeId: ExpressionId;

  const ExternalFunction: ExternalKind;
  const ExternalTable: ExternalKind;
  const ExternalMemory: ExternalKind;
  const ExternalGlobal: ExternalKind;

  interface I32Operations {
    load(offset: number, align: number, ptr: Expression): I32Expression;
    load8_s(offset: number, align: number, ptr: Expression): I32Expression;
    load8_u(offset: number, align: number, ptr: Expression): I32Expression;
    load16_s(offset: number, align: number, ptr: Expression): I32Expression;
    load16_u(offset: number, align: number, ptr: Expression): I32Expression;
    store(offset: number, align: number, ptr: Expression, value: I32Expression): Expression;
    store8(offset: number, align: number, ptr: Expression, value: I32Expression): Expression;
    store16(offset: number, align: number, ptr: Expression, value: I32Expression): Expression;
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
    atomic: {
      load(offset: number, ptr: Expression): I32Expression;
      load8_u(offset: number, ptr: Expression): I32Expression;
      load16_u(offset: number, ptr: Expression): I32Expression;
      store(offset: number, ptr: Expression, value: I32Expression): Expression;
      store8(offset: number, ptr: Expression, value: I32Expression): Expression;
      store16(offset: number, ptr: Expression, value: I32Expression): Expression;
      rmw: {
        add(offset: number, ptr: Expression, value: I32Expression): I32Expression;
        sub(offset: number, ptr: Expression, value: I32Expression): I32Expression;
        and(offset: number, ptr: Expression, value: I32Expression): I32Expression;
        or(offset: number, ptr: Expression, value: I32Expression): I32Expression;
        xor(offset: number, ptr: Expression, value: I32Expression): I32Expression;
        xchg(offset: number, ptr: Expression, value: I32Expression): I32Expression;
        cmpxchg(offset: number, ptr: Expression, expected: I32Expression, replacement: I32Expression): I32Expression;
      },
      rmw_8u: {
        add(offset: number, ptr: Expression, value: I32Expression): I32Expression;
        sub(offset: number, ptr: Expression, value: I32Expression): I32Expression;
        and(offset: number, ptr: Expression, value: I32Expression): I32Expression;
        or(offset: number, ptr: Expression, value: I32Expression): I32Expression;
        xor(offset: number, ptr: Expression, value: I32Expression): I32Expression;
        xchg(offset: number, ptr: Expression, value: I32Expression): I32Expression;
        cmpxchg(offset: number, ptr: Expression, expected: I32Expression, replacement: I32Expression): I32Expression;
      },
      rmw_16u: {
        add(offset: number, ptr: Expression, value: I32Expression): I32Expression;
        sub(offset: number, ptr: Expression, value: I32Expression): I32Expression;
        and(offset: number, ptr: Expression, value: I32Expression): I32Expression;
        or(offset: number, ptr: Expression, value: I32Expression): I32Expression;
        xor(offset: number, ptr: Expression, value: I32Expression): I32Expression;
        xchg(offset: number, ptr: Expression, value: I32Expression): I32Expression;
        cmpxchg(offset: number, ptr: Expression, expected: I32Expression, replacement: I32Expression): I32Expression;
      }
    },
    wait(ptr: Expression, expected: I32Expression, timeout: I64Expression): I32Expression;
  }

  interface I64Operations {
    load(offset: number, align: number, ptr: Expression): I64Expression;
    load8_s(offset: number, align: number, ptr: Expression): I64Expression;
    load8_u(offset: number, align: number, ptr: Expression): I64Expression;
    load16_s(offset: number, align: number, ptr: Expression): I64Expression;
    load16_u(offset: number, align: number, ptr: Expression): I64Expression;
    load32_s(offset: number, align: number, ptr: Expression): I64Expression;
    load32_u(offset: number, align: number, ptr: Expression): I64Expression;
    store(offset: number, align: number, ptr: Expression, value: I64Expression): Expression;
    store8(offset: number, align: number, ptr: Expression, value: I64Expression): Expression;
    store16(offset: number, align: number, ptr: Expression, value: I64Expression): Expression;
    store32(offset: number, align: number, ptr: Expression, value: I64Expression): Expression;
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
    eq(left: I64Expression, right: I64Expression): I32Expression;
    ne(left: I64Expression, right: I64Expression): I32Expression;
    lt_s(left: I64Expression, right: I64Expression): I32Expression;
    lt_u(left: I64Expression, right: I64Expression): I32Expression;
    le_s(left: I64Expression, right: I64Expression): I32Expression;
    le_u(left: I64Expression, right: I64Expression): I32Expression;
    gt_s(left: I64Expression, right: I64Expression): I32Expression;
    gt_u(left: I64Expression, right: I64Expression): I32Expression;
    ge_s(left: I64Expression, right: I64Expression): I32Expression;
    ge_u(left: I64Expression, right: I64Expression): I32Expression;
    atomic: {
      load(offset: number, ptr: Expression): I64Expression;
      load8_u(offset: number, ptr: Expression): I64Expression;
      load16_u(offset: number, ptr: Expression): I64Expression;
      load32_u(offset: number, ptr: Expression): I64Expression;
      store(offset: number, ptr: Expression, value: I64Expression): Expression;
      store8(offset: number, ptr: Expression, value: I64Expression): Expression;
      store16(offset: number, ptr: Expression, value: I64Expression): Expression;
      store32(offset: number, ptr: Expression, value: I64Expression): Expression;
      rmw: {
        add(offset: number, ptr: Expression, value: I64Expression): I64Expression;
        sub(offset: number, ptr: Expression, value: I64Expression): I64Expression;
        and(offset: number, ptr: Expression, value: I64Expression): I64Expression;
        or(offset: number, ptr: Expression, value: I64Expression): I64Expression;
        xor(offset: number, ptr: Expression, value: I64Expression): I64Expression;
        xchg(offset: number, ptr: Expression, value: I64Expression): I64Expression;
        cmpxchg(offset: number, ptr: Expression, expected: I64Expression, replacement: I64Expression): I64Expression;
      },
      rmw_8u: {
        add(offset: number, ptr: Expression, value: I64Expression): I64Expression;
        sub(offset: number, ptr: Expression, value: I64Expression): I64Expression;
        and(offset: number, ptr: Expression, value: I64Expression): I64Expression;
        or(offset: number, ptr: Expression, value: I64Expression): I64Expression;
        xor(offset: number, ptr: Expression, value: I64Expression): I64Expression;
        xchg(offset: number, ptr: Expression, value: I64Expression): I64Expression;
        cmpxchg(offset: number, ptr: Expression, expected: I64Expression, replacement: I64Expression): I64Expression;
      },
      rmw_16u: {
        add(offset: number, ptr: Expression, value: I64Expression): I64Expression;
        sub(offset: number, ptr: Expression, value: I64Expression): I64Expression;
        and(offset: number, ptr: Expression, value: I64Expression): I64Expression;
        or(offset: number, ptr: Expression, value: I64Expression): I64Expression;
        xor(offset: number, ptr: Expression, value: I64Expression): I64Expression;
        xchg(offset: number, ptr: Expression, value: I64Expression): I64Expression;
        cmpxchg(offset: number, ptr: Expression, expected: I64Expression, replacement: I64Expression): I64Expression;
      },
      rmw_32u: {
        add(offset: number, ptr: Expression, value: I64Expression): I64Expression;
        sub(offset: number, ptr: Expression, value: I64Expression): I64Expression;
        and(offset: number, ptr: Expression, value: I64Expression): I64Expression;
        or(offset: number, ptr: Expression, value: I64Expression): I64Expression;
        xor(offset: number, ptr: Expression, value: I64Expression): I64Expression;
        xchg(offset: number, ptr: Expression, value: I64Expression): I64Expression;
        cmpxchg(offset: number, ptr: Expression, expected: I64Expression, replacement: I64Expression): I64Expression;
      }
    },
    wait(ptr: Expression, expected: I64Expression, timeout: I64Expression): I32Expression;
  }

  interface F32Operations {
    load(offset: number, align: number, ptr: Expression): F32Expression;
    store(offset: number, align: number, ptr: Expression, value: F32Expression): Expression;
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
    eq(left: F32Expression, right: F32Expression): I32Expression;
    ne(left: F32Expression, right: F32Expression): I32Expression;
    lt(left: F32Expression, right: F32Expression): I32Expression;
    le(left: F32Expression, right: F32Expression): I32Expression;
    gt(left: F32Expression, right: F32Expression): I32Expression;
    ge(left: F32Expression, right: F32Expression): I32Expression;
  }

  interface F64Operations {
    load(offset: number, align: number, ptr: Expression): F64Expression;
    store(offset: number, align: number, ptr: Expression, value: F32Expression): Expression;
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
    eq(left: F64Expression, right: F64Expression): I32Expression;
    ne(left: F64Expression, right: F64Expression): I32Expression;
    lt(left: F64Expression, right: F64Expression): I32Expression;
    le(left: F64Expression, right: F64Expression): I32Expression;
    gt(left: F64Expression, right: F64Expression): I32Expression;
    ge(left: F64Expression, right: F64Expression): I32Expression;
  }

  interface MemorySegment {
    offset: I32Expression;
    data: Uint8Array;
  }

  class Module {

    addFunctionType(name: string, resultType: Type, paramTypes: Type[]): FunctionType;
    getFunctionTypeBySignature(resultType: Type, paramTypes: Type[]): FunctionType;
    addFunction(name: string, functionType: FunctionType, varTypes: Type[], body: Statement): Function;
    getFunction(name: string): Function;
    removeFunction(name: string): void;
    addGlobal(name: string, type: Type, mutable: boolean, init: Expression): Global;
    addFunctionImport(internalName: string, externalModuleName: string, externalBaseName: string, functionType: FunctionType): Import;
    addTableImport(internalName: string, externalModuleName: string, externalBaseName: string): Import;
    addMemoryImport(internalName: string, externalModuleName: string, externalBaseName: string): Import;
    addGlobalImport(internalName: string, externalModuleName: string, externalBaseName: string, globalType: Type): Import;
    removeImport(internalName: string): void;
    addFunctionExport(internalName: string, externalName: string): Export;
    addTableExport(internalName: string, externalName: string): Export;
    addMemoryExport(internalName: string, externalName: string): Export;
    addGlobalExport(internalName: string, externalName: string): Export;
    removeExport(externalName: string): void;
    setFunctionTable(funcs: number[]): void;
    setMemory(initial: number, maximum: number, exportName?: string | null, segments?: MemorySegment[]): void;
    setStart(start: binaryen.Function): void;

    emitBinary(): Uint8Array;
    emitText(): string;
    emitAsmjs(): string;
    validate(): number;
    optimize(): void;
    optimizeFunction(func: string|Function): void;
    runPasses(passes: string[]): void;
    runPassesOnFunction(func: string|Function, passes: string[]): void;
    autoDrop(): void;
    interpret(): void;
    dispose(): void;

    i32: I32Operations;
    i64: I64Operations;
    f32: F32Operations;
    f64: F64Operations;

    block(label: string, children: Statement[], resultType?: Type): Statement;
    if(condition: I32Expression, ifTrue: Statement, ifFalse?: Statement): Statement;
    loop(label: string, body: Statement): Statement;

    break(label: string, condition?: I32Expression, value?: I32Expression): Statement;
    /* alias */ br(label: string, condition?: I32Expression, value?: I32Expression): Statement;
    /* alias */ br_if(label: string, condition?: I32Expression, value?: I32Expression): Statement;
    switch(labels: string[], defaultLabel: string, condition: I32Expression, value?: I32Expression): Statement;
    call(name: string, operands: Expression[], type: Type): Expression;
    callImport(name: string, operands: Expression[], type: Type): Expression;
    /* alias */ call_import(name: string, operands: Expression[], type: Type): Expression;
    callIndirect(target: I32Expression, operands: Expression[], type: Type): Expression;
    /* alias */ call_indirect(target: I32Expression, operands: Expression[], type: Type): Expression;
    getLocal(index: number, type: Type): Expression;
    /* alias */ get_local(index: number, type: Type): Expression;
    setLocal(index: number, value: Expression): Statement;
    /* alias */ set_local(index: number, value: Expression): Statement;
    teeLocal(index: number, value: Expression): Expression;
    /* alias */ tee_local(index: number, value: Expression): Expression;
    getGlobal(name: string, type: Type): Expression;
    /* alias */ get_global(name: string, type: Type): Expression;
    setGlobal(name: string, value: Expression): Expression;
    /* alias */ set_global(name: string, value: Expression): Expression;
    select(condition: I32Expression, ifTrue: Expression, ifFalse: Expression): Expression;
    drop(value: Expression): Statement;
    return(value?: Expression): Statement;
    nop(): Statement;
    growMemory(value: Expression): Expression;
    /* alias */ grow_memory(value: Expression): Expression;
    currentMemory(): Expression;
    /* alias */ current_memory(): Expression;
    hasFeature(name: string): Expression;
    /* alias */ has_feature(name: string): Expression;
    unreachable(): Statement;
    wake(ptr: Expression, wakeCount: I64Expression): I64Expression;
  }

  function getExpressionId(expression: Expression): number;
  function getExpressionType(expression: Expression): Type;
  function getExpressionInfo(expression: Expression): { [key: string]: any; id: ExpressionId, type: Type };
  function getFunctionTypeInfo(ftype: FunctionType): { name: string, params: Type[], result: Type };
  function getFunctionInfo(func: Function): { name: string, type: FunctionType, params: Type[], result: Type, vars: Type[], body: Expression };
  function getImportInfo(import_: Import): { kind: ExternalKind; module: string, base: string, name: string, globalType?: Type, functionType?: string };
  function getExportInfo(export_: Export): { kind: ExternalKind; name: string, value: string };
  function emitText(expression: Expression): string;
  function readBinary(data: Uint8Array): Module;
  function parseText(text: string): Module;
  function setAPITracing(on: boolean): void;

  class Relooper {
    addBlock(expression: Expression): RelooperBlock;
    addBranch(from: RelooperBlock, to: RelooperBlock, condition: Expression, code: Expression): void;
    addBlockWithSwitch(code: Expression, condition: Expression): RelooperBlock;
    addBranchForSwitch(from: RelooperBlock, to: RelooperBlock, indexes: number[], code: Expression): void;
    renderAndDispose(entry: RelooperBlock, labelHelper: number, module: Module): Expression;
  }

  // These are actually pointers internally
  abstract class Type { protected __Type__: number; }
  abstract class ExpressionId { protected __ExpressionId__: number; }
  abstract class ExternalKind { protected __ExternalKind__: number; }
  abstract class Statement { protected __Statement__: number; }
  abstract class FunctionType { protected __FunctionType__: number; }
  abstract class Function { protected __Function__: number; }
  abstract class Expression { protected __Expression__: number; }
  abstract class Global { protected __Global__: number; }
  abstract class Import { protected __Import__: number; }
  abstract class Export { protected __Export__: number; }
  abstract class I32Expression extends Expression { protected __I32Expression__: number; }
  abstract class I64Expression extends Expression { protected __I64Expression__: number; }
  abstract class F32Expression extends Expression { protected __F32Expression__: number; }
  abstract class F64Expression extends Expression { protected __F64Expression__: number; }
  abstract class RelooperBlock { protected __RelooperBlock__: number; }
}

export = binaryen;

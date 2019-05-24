declare module binaryen {

  type Type = number;

  const none: Type;
  const i32: Type;
  const i64: Type;
  const f32: Type;
  const f64: Type;
  const v128: Type;
  const except_ref: Type;
  const unreachable: Type;
  const auto: Type;

  type ExpressionId = number;

  const InvalidId: ExpressionId;
  const BlockId: ExpressionId;
  const IfId: ExpressionId;
  const LoopId: ExpressionId;
  const BreakId: ExpressionId;
  const SwitchId: ExpressionId;
  const CallId: ExpressionId;
  const CallIndirectId: ExpressionId;
  const LocalGetId: ExpressionId;
  const LocalSetId: ExpressionId;
  const GlobalGetId: ExpressionId;
  const GlobalSetId: ExpressionId;
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
  const AtomicNotifyId: ExpressionId;
  const SIMDExtractId: ExpressionId;
  const SIMDReplaceId: ExpressionId;
  const SIMDShuffleId: ExpressionId;
  const SIMDBitselectId: ExpressionId;
  const SIMDShiftId: ExpressionId;
  const MemoryInitId: ExpressionId;
  const DataDropId: ExpressionId;
  const MemoryCopyId: ExpressionId;
  const MemoryFillId: ExpressionId;

  type ExternalKind = number;

  const ExternalFunction: ExternalKind;
  const ExternalTable: ExternalKind;
  const ExternalMemory: ExternalKind;
  const ExternalGlobal: ExternalKind;

  type FeatureFlags = number;

  const Features: {
    Atomics: FeatureFlags;
    BulkMemory: FeatureFlags;
    MutableGlobals: FeatureFlags;
    NontrappingFPToInt: FeatureFlags;
    SignExt: FeatureFlags;
    SIMD128: FeatureFlags;
    ExceptionHandling: FeatureFlags;
  };

  type Op = number;

  const ClzInt32: Op;
  const CtzInt32: Op;
  const PopcntInt32: Op;
  const NegFloat32: Op;
  const AbsFloat32: Op;
  const CeilFloat32: Op;
  const FloorFloat32: Op;
  const TruncFloat32: Op;
  const NearestFloat32: Op;
  const SqrtFloat32: Op;
  const EqZInt32: Op;
  const ClzInt64: Op;
  const CtzInt64: Op;
  const PopcntInt64: Op;
  const NegFloat64: Op;
  const AbsFloat64: Op;
  const CeilFloat64: Op;
  const FloorFloat64: Op;
  const TruncFloat64: Op;
  const NearestFloat64: Op;
  const SqrtFloat64: Op;
  const EqZInt64: Op;
  const ExtendSInt32: Op;
  const ExtendUInt32: Op;
  const WrapInt64: Op;
  const TruncSFloat32ToInt32: Op;
  const TruncSFloat32ToInt64: Op;
  const TruncUFloat32ToInt32: Op;
  const TruncUFloat32ToInt64: Op;
  const TruncSFloat64ToInt32: Op;
  const TruncSFloat64ToInt64: Op;
  const TruncUFloat64ToInt32: Op;
  const TruncUFloat64ToInt64: Op;
  const TruncSatSFloat32ToInt32: Op;
  const TruncSatSFloat32ToInt64: Op;
  const TruncSatUFloat32ToInt32: Op;
  const TruncSatUFloat32ToInt64: Op;
  const TruncSatSFloat64ToInt32: Op;
  const TruncSatSFloat64ToInt64: Op;
  const TruncSatUFloat64ToInt32: Op;
  const TruncSatUFloat64ToInt64: Op;
  const ReinterpretFloat32: Op;
  const ReinterpretFloat64: Op;
  const ConvertSInt32ToFloat32: Op;
  const ConvertSInt32ToFloat64: Op;
  const ConvertUInt32ToFloat32: Op;
  const ConvertUInt32ToFloat64: Op;
  const ConvertSInt64ToFloat32: Op;
  const ConvertSInt64ToFloat64: Op;
  const ConvertUInt64ToFloat32: Op;
  const ConvertUInt64ToFloat64: Op;
  const PromoteFloat32: Op;
  const DemoteFloat64: Op;
  const ReinterpretInt32: Op;
  const ReinterpretInt64: Op;
  const ExtendS8Int32: Op;
  const ExtendS16Int32: Op;
  const ExtendS8Int64: Op;
  const ExtendS16Int64: Op;
  const ExtendS32Int64: Op;
  const AddInt32: Op;
  const SubInt32: Op;
  const MulInt32: Op;
  const DivSInt32: Op;
  const DivUInt32: Op;
  const RemSInt32: Op;
  const RemUInt32: Op;
  const AndInt32: Op;
  const OrInt32: Op;
  const XorInt32: Op;
  const ShlInt32: Op;
  const ShrUInt32: Op;
  const ShrSInt32: Op;
  const RotLInt32: Op;
  const RotRInt32: Op;
  const EqInt32: Op;
  const NeInt32: Op;
  const LtSInt32: Op;
  const LtUInt32: Op;
  const LeSInt32: Op;
  const LeUInt32: Op;
  const GtSInt32: Op;
  const GtUInt32: Op;
  const GeSInt32: Op;
  const GeUInt32: Op;
  const AddInt64: Op;
  const SubInt64: Op;
  const MulInt64: Op;
  const DivSInt64: Op;
  const DivUInt64: Op;
  const RemSInt64: Op;
  const RemUInt64: Op;
  const AndInt64: Op;
  const OrInt64: Op;
  const XorInt64: Op;
  const ShlInt64: Op;
  const ShrUInt64: Op;
  const ShrSInt64: Op;
  const RotLInt64: Op;
  const RotRInt64: Op;
  const EqInt64: Op;
  const NeInt64: Op;
  const LtSInt64: Op;
  const LtUInt64: Op;
  const LeSInt64: Op;
  const LeUInt64: Op;
  const GtSInt64: Op;
  const GtUInt64: Op;
  const GeSInt64: Op;
  const GeUInt64: Op;
  const AddFloat32: Op;
  const SubFloat32: Op;
  const MulFloat32: Op;
  const DivFloat32: Op;
  const CopySignFloat32: Op;
  const MinFloat32: Op;
  const MaxFloat32: Op;
  const EqFloat32: Op;
  const NeFloat32: Op;
  const LtFloat32: Op;
  const LeFloat32: Op;
  const GtFloat32: Op;
  const GeFloat32: Op;
  const AddFloat64: Op;
  const SubFloat64: Op;
  const MulFloat64: Op;
  const DivFloat64: Op;
  const CopySignFloat64: Op;
  const MinFloat64: Op;
  const MaxFloat64: Op;
  const EqFloat64: Op;
  const NeFloat64: Op;
  const LtFloat64: Op;
  const LeFloat64: Op;
  const GtFloat64: Op;
  const GeFloat64: Op;
  const MemorySize: Op;
  const MemoryGrow: Op;
  const AtomicRMWAdd: Op;
  const AtomicRMWSub: Op;
  const AtomicRMWAnd: Op;
  const AtomicRMWOr: Op;
  const AtomicRMWXor: Op;
  const AtomicRMWXchg: Op;
  const SplatVecI8x16: Op;
  const ExtractLaneSVecI8x16: Op;
  const ExtractLaneUVecI8x16: Op;
  const ReplaceLaneVecI8x16: Op;
  const SplatVecI16x8: Op;
  const ExtractLaneSVecI16x8: Op;
  const ExtractLaneUVecI16x8: Op;
  const ReplaceLaneVecI16x8: Op;
  const SplatVecI32x4: Op;
  const ExtractLaneVecI32x4: Op;
  const ReplaceLaneVecI32x4: Op;
  const SplatVecI64x2: Op;
  const ExtractLaneVecI64x2: Op;
  const ReplaceLaneVecI64x2: Op;
  const SplatVecF32x4: Op;
  const ExtractLaneVecF32x4: Op;
  const ReplaceLaneVecF32x4: Op;
  const SplatVecF64x2: Op;
  const ExtractLaneVecF64x2: Op;
  const ReplaceLaneVecF64x2: Op;
  const EqVecI8x16: Op;
  const NeVecI8x16: Op;
  const LtSVecI8x16: Op;
  const LtUVecI8x16: Op;
  const GtSVecI8x16: Op;
  const GtUVecI8x16: Op;
  const LeSVecI8x16: Op;
  const LeUVecI8x16: Op;
  const GeSVecI8x16: Op;
  const GeUVecI8x16: Op;
  const EqVecI16x8: Op;
  const NeVecI16x8: Op;
  const LtSVecI16x8: Op;
  const LtUVecI16x8: Op;
  const GtSVecI16x8: Op;
  const GtUVecI16x8: Op;
  const LeSVecI16x8: Op;
  const LeUVecI16x8: Op;
  const GeSVecI16x8: Op;
  const GeUVecI16x8: Op;
  const EqVecI32x4: Op;
  const NeVecI32x4: Op;
  const LtSVecI32x4: Op;
  const LtUVecI32x4: Op;
  const GtSVecI32x4: Op;
  const GtUVecI32x4: Op;
  const LeSVecI32x4: Op;
  const LeUVecI32x4: Op;
  const GeSVecI32x4: Op;
  const GeUVecI32x4: Op;
  const EqVecF32x4: Op;
  const NeVecF32x4: Op;
  const LtVecF32x4: Op;
  const GtVecF32x4: Op;
  const LeVecF32x4: Op;
  const GeVecF32x4: Op;
  const EqVecF64x2: Op;
  const NeVecF64x2: Op;
  const LtVecF64x2: Op;
  const GtVecF64x2: Op;
  const LeVecF64x2: Op;
  const GeVecF64x2: Op;
  const NotVec128: Op;
  const AndVec128: Op;
  const OrVec128: Op;
  const XorVec128: Op;
  const NegVecI8x16: Op;
  const AnyTrueVecI8x16: Op;
  const AllTrueVecI8x16: Op;
  const ShlVecI8x16: Op;
  const ShrSVecI8x16: Op;
  const ShrUVecI8x16: Op;
  const AddVecI8x16: Op;
  const AddSatSVecI8x16: Op;
  const AddSatUVecI8x16: Op;
  const SubVecI8x16: Op;
  const SubSatSVecI8x16: Op;
  const SubSatUVecI8x16: Op;
  const MulVecI8x16: Op;
  const NegVecI16x8: Op;
  const AnyTrueVecI16x8: Op;
  const AllTrueVecI16x8: Op;
  const ShlVecI16x8: Op;
  const ShrSVecI16x8: Op;
  const ShrUVecI16x8: Op;
  const AddVecI16x8: Op;
  const AddSatSVecI16x8: Op;
  const AddSatUVecI16x8: Op;
  const SubVecI16x8: Op;
  const SubSatSVecI16x8: Op;
  const SubSatUVecI16x8: Op;
  const MulVecI16x8: Op;
  const NegVecI32x4: Op;
  const AnyTrueVecI32x4: Op;
  const AllTrueVecI32x4: Op;
  const ShlVecI32x4: Op;
  const ShrSVecI32x4: Op;
  const ShrUVecI32x4: Op;
  const AddVecI32x4: Op;
  const SubVecI32x4: Op;
  const MulVecI32x4: Op;
  const NegVecI64x2: Op;
  const AnyTrueVecI64x2: Op;
  const AllTrueVecI64x2: Op;
  const ShlVecI64x2: Op;
  const ShrSVecI64x2: Op;
  const ShrUVecI64x2: Op;
  const AddVecI64x2: Op;
  const SubVecI64x2: Op;
  const AbsVecF32x4: Op;
  const NegVecF32x4: Op;
  const SqrtVecF32x4: Op;
  const AddVecF32x4: Op;
  const SubVecF32x4: Op;
  const MulVecF32x4: Op;
  const DivVecF32x4: Op;
  const MinVecF32x4: Op;
  const MaxVecF32x4: Op;
  const AbsVecF64x2: Op;
  const NegVecF64x2: Op;
  const SqrtVecF64x2: Op;
  const AddVecF64x2: Op;
  const SubVecF64x2: Op;
  const MulVecF64x2: Op;
  const DivVecF64x2: Op;
  const MinVecF64x2: Op;
  const MaxVecF64x2: Op;
  const TruncSatSVecF32x4ToVecI32x4: Op;
  const TruncSatUVecF32x4ToVecI32x4: Op;
  const TruncSatSVecF64x2ToVecI64x2: Op;
  const TruncSatUVecF64x2ToVecI64x2: Op;
  const ConvertSVecI32x4ToVecF32x4: Op;
  const ConvertUVecI32x4ToVecF32x4: Op;
  const ConvertSVecI64x2ToVecF64x2: Op;
  const ConvertUVecI64x2ToVecF64x2: Op;

  type ExpressionRef = number;
  type FunctionTypeRef = number;
  type FunctionRef = number;
  type GlobalRef = number;
  type ImportRef = number;
  type ExportRef = number;

  interface MemorySegment {
    offset: ExpressionRef;
    data: Uint8Array;
    passive?: boolean;
  }

  class Module {
    constructor();
    readonly ptr: number;
    block(label: string, children: ExpressionRef[], resultType?: Type): ExpressionRef;
    if(condition: ExpressionRef, ifTrue: ExpressionRef, ifFalse?: ExpressionRef): ExpressionRef;
    loop(label: string, body: ExpressionRef): ExpressionRef;
    br(label: string, condition?: ExpressionRef, value?: ExpressionRef): ExpressionRef;
    br_if(label: string, condition?: ExpressionRef, value?: ExpressionRef): ExpressionRef;
    call(name: string, operands: ExpressionRef[], type: Type): ExpressionRef;
    call_indirect(target: ExpressionRef, operands: ExpressionRef[], type: Type): ExpressionRef;
    local: {
      get(index: number, type: Type): ExpressionRef;
      set(index: number, value: ExpressionRef): ExpressionRef;
      tee(index: number, value: ExpressionRef): ExpressionRef;
    };
    global: {
      get(name: string, type: Type): ExpressionRef;
      set(name: string, value: ExpressionRef): ExpressionRef;
    };
    memory: {
      size(): ExpressionRef;
      grow(value: ExpressionRef): ExpressionRef;
      init(segment: number, dest: ExpressionRef, offset: ExpressionRef, size: ExpressionRef): ExpressionRef;
      copy(dest: ExpressionRef, source: ExpressionRef, size: ExpressionRef): ExpressionRef;
      fill(dest: ExpressionRef, value: ExpressionRef, size: ExpressionRef): ExpressionRef;
    };
    data: {
      drop(segment: number): ExpressionRef;
    };
    i32: {
      load(offset: number, align: number, ptr: ExpressionRef): ExpressionRef;
      load8_s(offset: number, align: number, ptr: ExpressionRef): ExpressionRef;
      load8_u(offset: number, align: number, ptr: ExpressionRef): ExpressionRef;
      load16_s(offset: number, align: number, ptr: ExpressionRef): ExpressionRef;
      load16_u(offset: number, align: number, ptr: ExpressionRef): ExpressionRef;
      store(offset: number, align: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
      store8(offset: number, align: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
      store16(offset: number, align: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
      const(value: number): ExpressionRef;
      clz(value: ExpressionRef): ExpressionRef;
      ctz(value: ExpressionRef): ExpressionRef;
      popcnt(value: ExpressionRef): ExpressionRef;
      eqz(value: ExpressionRef): ExpressionRef;
      trunc_s: {
        f32(value: ExpressionRef): ExpressionRef;
        f64(value: ExpressionRef): ExpressionRef;
      };
      trunc_u: {
        f32(value: ExpressionRef): ExpressionRef;
        f64(value: ExpressionRef): ExpressionRef;
      };
      trunc_s_sat: {
        f32(value: ExpressionRef): ExpressionRef;
        f64(value: ExpressionRef): ExpressionRef;
      };
      trunc_u_sat: {
        f32(value: ExpressionRef): ExpressionRef;
        f64(value: ExpressionRef): ExpressionRef;
      };
      reinterpret(value: ExpressionRef): ExpressionRef;
      extend8_s(value: ExpressionRef): ExpressionRef;
      extend16_s(value: ExpressionRef): ExpressionRef;
      wrap(value: ExpressionRef): ExpressionRef;
      add(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      sub(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      mul(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      div_s(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      div_u(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      rem_s(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      rem_u(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      and(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      or(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      xor(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      shl(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      shr_u(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      shr_s(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      rotl(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      rotr(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      eq(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      ne(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      lt_s(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      lt_u(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      le_s(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      le_u(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      gt_s(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      gt_u(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      ge_s(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      ge_u(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      atomic: {
        load(offset: number, ptr: ExpressionRef): ExpressionRef;
        load8_u(offset: number, ptr: ExpressionRef): ExpressionRef;
        load16_u(offset: number, ptr: ExpressionRef): ExpressionRef;
        store(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
        store8(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
        store16(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
        rmw: {
          add(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          sub(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          and(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          or(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          xor(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          xchg(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          cmpxchg(offset: number, ptr: ExpressionRef, expected: ExpressionRef, replacement: ExpressionRef): ExpressionRef;
        },
        rmw8_u: {
          add(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          sub(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          and(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          or(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          xor(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          xchg(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          cmpxchg(offset: number, ptr: ExpressionRef, expected: ExpressionRef, replacement: ExpressionRef): ExpressionRef;
        },
        rmw16_u: {
          add(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          sub(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          and(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          or(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          xor(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          xchg(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          cmpxchg(offset: number, ptr: ExpressionRef, expected: ExpressionRef, replacement: ExpressionRef): ExpressionRef;
        }
      },
      wait(ptr: ExpressionRef, expected: ExpressionRef, timeout: ExpressionRef): ExpressionRef;
    };
    i64: {
      load(offset: number, align: number, ptr: ExpressionRef): ExpressionRef;
      load8_s(offset: number, align: number, ptr: ExpressionRef): ExpressionRef;
      load8_u(offset: number, align: number, ptr: ExpressionRef): ExpressionRef;
      load16_s(offset: number, align: number, ptr: ExpressionRef): ExpressionRef;
      load16_u(offset: number, align: number, ptr: ExpressionRef): ExpressionRef;
      load32_s(offset: number, align: number, ptr: ExpressionRef): ExpressionRef;
      load32_u(offset: number, align: number, ptr: ExpressionRef): ExpressionRef;
      store(offset: number, align: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
      store8(offset: number, align: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
      store16(offset: number, align: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
      store32(offset: number, align: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
      const(low: number, high: number): ExpressionRef;
      clz(value: ExpressionRef): ExpressionRef;
      ctz(value: ExpressionRef): ExpressionRef;
      popcnt(value: ExpressionRef): ExpressionRef;
      eqz(value: ExpressionRef): ExpressionRef;
      trunc_s: {
        f32(value: ExpressionRef): ExpressionRef;
        f64(value: ExpressionRef): ExpressionRef;
      };
      trunc_u: {
        f32(value: ExpressionRef): ExpressionRef;
        f64(value: ExpressionRef): ExpressionRef;
      };
      trunc_s_sat: {
        f32(value: ExpressionRef): ExpressionRef;
        f64(value: ExpressionRef): ExpressionRef;
      };
      trunc_u_sat: {
        f32(value: ExpressionRef): ExpressionRef;
        f64(value: ExpressionRef): ExpressionRef;
      };
      reinterpret(value: ExpressionRef): ExpressionRef;
      extend8_s(value: ExpressionRef): ExpressionRef;
      extend16_s(value: ExpressionRef): ExpressionRef;
      extend32_s(value: ExpressionRef): ExpressionRef;
      extend_s(value: ExpressionRef): ExpressionRef;
      extend_u(value: ExpressionRef): ExpressionRef;
      add(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      sub(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      mul(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      div_s(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      div_u(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      rem_s(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      rem_u(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      and(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      or(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      xor(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      shl(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      shr_u(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      shr_s(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      rotl(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      rotr(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      eq(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      ne(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      lt_s(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      lt_u(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      le_s(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      le_u(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      gt_s(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      gt_u(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      ge_s(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      ge_u(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      atomic: {
        load(offset: number, ptr: ExpressionRef): ExpressionRef;
        load8_u(offset: number, ptr: ExpressionRef): ExpressionRef;
        load16_u(offset: number, ptr: ExpressionRef): ExpressionRef;
        load32_u(offset: number, ptr: ExpressionRef): ExpressionRef;
        store(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
        store8(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
        store16(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
        store32(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
        rmw: {
          add(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          sub(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          and(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          or(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          xor(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          xchg(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          cmpxchg(offset: number, ptr: ExpressionRef, expected: ExpressionRef, replacement: ExpressionRef): ExpressionRef;
        },
        rmw8_u: {
          add(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          sub(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          and(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          or(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          xor(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          xchg(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          cmpxchg(offset: number, ptr: ExpressionRef, expected: ExpressionRef, replacement: ExpressionRef): ExpressionRef;
        },
        rmw16_u: {
          add(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          sub(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          and(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          or(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          xor(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          xchg(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          cmpxchg(offset: number, ptr: ExpressionRef, expected: ExpressionRef, replacement: ExpressionRef): ExpressionRef;
        },
        rmw32_u: {
          add(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          sub(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          and(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          or(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          xor(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          xchg(offset: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
          cmpxchg(offset: number, ptr: ExpressionRef, expected: ExpressionRef, replacement: ExpressionRef): ExpressionRef;
        }
      },
      wait(ptr: ExpressionRef, expected: ExpressionRef, timeout: ExpressionRef): ExpressionRef;
    };
    f32: {
      load(offset: number, align: number, ptr: ExpressionRef): ExpressionRef;
      store(offset: number, align: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
      const(value: number): ExpressionRef;
      const_bits(value: number): ExpressionRef;
      neg(value: ExpressionRef): ExpressionRef;
      abs(value: ExpressionRef): ExpressionRef;
      ceil(value: ExpressionRef): ExpressionRef;
      floor(value: ExpressionRef): ExpressionRef;
      trunc(value: ExpressionRef): ExpressionRef;
      nearest(value: ExpressionRef): ExpressionRef;
      sqrt(value: ExpressionRef): ExpressionRef;
      reinterpret(value: ExpressionRef): ExpressionRef;
      convert_s: {
        i32(value: ExpressionRef): ExpressionRef;
        i64(value: ExpressionRef): ExpressionRef;
      };
      convert_u: {
        i32(value: ExpressionRef): ExpressionRef;
        i64(value: ExpressionRef): ExpressionRef;
      };
      demote(value: ExpressionRef): ExpressionRef;
      add(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      sub(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      mul(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      div(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      copysign(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      min(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      max(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      eq(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      ne(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      lt(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      le(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      gt(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      ge(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
    };
    f64: {
      load(offset: number, align: number, ptr: ExpressionRef): ExpressionRef;
      store(offset: number, align: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
      const(value: number): ExpressionRef;
      const_bits(low: number, high: number): ExpressionRef;
      neg(value: ExpressionRef): ExpressionRef;
      abs(value: ExpressionRef): ExpressionRef;
      ceil(value: ExpressionRef): ExpressionRef;
      floor(value: ExpressionRef): ExpressionRef;
      trunc(value: ExpressionRef): ExpressionRef;
      nearest(value: ExpressionRef): ExpressionRef;
      sqrt(value: ExpressionRef): ExpressionRef;
      reinterpret(value: ExpressionRef): ExpressionRef;
      convert_s: {
        i32(value: ExpressionRef): ExpressionRef;
        i64(value: ExpressionRef): ExpressionRef;
      };
      convert_u: {
        i32(value: ExpressionRef): ExpressionRef;
        i64(value: ExpressionRef): ExpressionRef;
      };
      promote(value: ExpressionRef): ExpressionRef;
      add(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      sub(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      mul(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      div(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      copysign(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      min(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      max(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      eq(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      ne(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      lt(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      le(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      gt(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      ge(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
    };
    v128: {
      load(offset: number, align: number, ptr: ExpressionRef): ExpressionRef;
      store(offset: number, align: number, ptr: ExpressionRef, value: ExpressionRef): ExpressionRef;
      const(value: number): ExpressionRef;
      not(value: ExpressionRef): ExpressionRef;
      and(value: ExpressionRef): ExpressionRef;
      or(value: ExpressionRef): ExpressionRef;
      xor(value: ExpressionRef): ExpressionRef;
      bitselect(left: ExpressionRef, right: ExpressionRef, cond: ExpressionRef): ExpressionRef;
    };
    v8x16: {
      shuffle(left: ExpressionRef, right: ExpressionRef, mask: number[]): ExpressionRef;
    };
    i8x16: {
      splat(value: ExpressionRef): ExpressionRef;
      extract_lane_s(vec: ExpressionRef, index: ExpressionRef): ExpressionRef;
      extract_lane_u(vec: ExpressionRef, index: ExpressionRef): ExpressionRef;
      replace_lane(vec: ExpressionRef, index: ExpressionRef, value: ExpressionRef): ExpressionRef;
      eq(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      ne(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      lt_s(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      lt_u(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      gt_s(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      gt_u(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      le_s(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      le_u(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      ge_s(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      ge_u(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      neg(value: ExpressionRef): ExpressionRef;
      any_true(value: ExpressionRef): ExpressionRef;
      all_true(value: ExpressionRef): ExpressionRef;
      shl(vec: ExpressionRef, shift: ExpressionRef): ExpressionRef;
      shr_s(vec: ExpressionRef, shift: ExpressionRef): ExpressionRef;
      shr_u(vec: ExpressionRef, shift: ExpressionRef): ExpressionRef;
      add(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      add_saturate_s(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      add_saturate_u(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      sub(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      sub_saturate_s(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      sub_saturate_u(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      mul(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
    };
    i16x8: {
      splat(value: ExpressionRef): ExpressionRef;
      extract_lane_s(vec: ExpressionRef, index: ExpressionRef): ExpressionRef;
      extract_lane_u(vec: ExpressionRef, index: ExpressionRef): ExpressionRef;
      replace_lane(vec: ExpressionRef, index: ExpressionRef, value: ExpressionRef): ExpressionRef;
      eq(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      ne(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      lt_s(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      lt_u(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      gt_s(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      gt_u(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      le_s(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      le_u(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      ge_s(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      ge_u(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      neg(value: ExpressionRef): ExpressionRef;
      any_true(value: ExpressionRef): ExpressionRef;
      all_true(value: ExpressionRef): ExpressionRef;
      shl(vec: ExpressionRef, shift: ExpressionRef): ExpressionRef;
      shr_s(vec: ExpressionRef, shift: ExpressionRef): ExpressionRef;
      shr_u(vec: ExpressionRef, shift: ExpressionRef): ExpressionRef;
      add(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      add_saturate_s(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      add_saturate_u(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      sub(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      sub_saturate_s(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      sub_saturate_u(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      mul(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
    };
    i32x4: {
      splat(value: ExpressionRef): ExpressionRef;
      extract_lane(vec: ExpressionRef, index: ExpressionRef): ExpressionRef;
      replace_lane(vec: ExpressionRef, index: ExpressionRef, value: ExpressionRef): ExpressionRef;
      eq(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      ne(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      lt_s(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      lt_u(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      gt_s(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      gt_u(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      le_s(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      le_u(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      ge_s(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      ge_u(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      neg(value: ExpressionRef): ExpressionRef;
      any_true(value: ExpressionRef): ExpressionRef;
      all_true(value: ExpressionRef): ExpressionRef;
      shl(vec: ExpressionRef, shift: ExpressionRef): ExpressionRef;
      shr_s(vec: ExpressionRef, shift: ExpressionRef): ExpressionRef;
      shr_u(vec: ExpressionRef, shift: ExpressionRef): ExpressionRef;
      add(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      sub(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      mul(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      ["trunc_s/f32x4:sat"](value: ExpressionRef): ExpressionRef;
      ["trunc_u/f32x4:sat"](value: ExpressionRef): ExpressionRef;
    };
    i64x2: {
      splat(value: ExpressionRef): ExpressionRef;
      extract_lane(vec: ExpressionRef, index: ExpressionRef): ExpressionRef;
      replace_lane(vec: ExpressionRef, index: ExpressionRef, value: ExpressionRef): ExpressionRef;
      neg(value: ExpressionRef): ExpressionRef;
      any_true(value: ExpressionRef): ExpressionRef;
      all_true(value: ExpressionRef): ExpressionRef;
      shl(vec: ExpressionRef, shift: ExpressionRef): ExpressionRef;
      shr_s(vec: ExpressionRef, shift: ExpressionRef): ExpressionRef;
      shr_u(vec: ExpressionRef, shift: ExpressionRef): ExpressionRef;
      add(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      sub(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      ["trunc_s/f64x2:sat"](value: ExpressionRef): ExpressionRef;
      ["trunc_u/f64x2:sat"](value: ExpressionRef): ExpressionRef;
    };
    f32x4: {
      splat(value: ExpressionRef): ExpressionRef;
      extract_lane(vec: ExpressionRef, index: ExpressionRef): ExpressionRef;
      replace_lane(vec: ExpressionRef, index: ExpressionRef, value: ExpressionRef): ExpressionRef;
      eq(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      ne(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      lt(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      gt(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      le(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      ge(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      abs(value: ExpressionRef): ExpressionRef;
      neg(value: ExpressionRef): ExpressionRef;
      sqrt(value: ExpressionRef): ExpressionRef;
      add(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      sub(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      mul(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      div(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      min(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      max(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      ["convert_s/i32x4"](value: ExpressionRef): ExpressionRef;
      ["convert_u/i32x4"](value: ExpressionRef): ExpressionRef;
    };
    f64x2: {
      splat(value: ExpressionRef): ExpressionRef;
      extract_lane(vec: ExpressionRef, index: ExpressionRef): ExpressionRef;
      replace_lane(vec: ExpressionRef, index: ExpressionRef, value: ExpressionRef): ExpressionRef;
      eq(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      ne(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      lt(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      gt(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      le(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      ge(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      abs(value: ExpressionRef): ExpressionRef;
      neg(value: ExpressionRef): ExpressionRef;
      sqrt(value: ExpressionRef): ExpressionRef;
      add(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      sub(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      mul(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      div(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      min(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      max(left: ExpressionRef, right: ExpressionRef): ExpressionRef;
      ["convert_s/i64x2"](value: ExpressionRef): ExpressionRef;
      ["convert_u/i64x2"](value: ExpressionRef): ExpressionRef;
    };
    select(condition: ExpressionRef, ifTrue: ExpressionRef, ifFalse: ExpressionRef): ExpressionRef;
    drop(value: ExpressionRef): ExpressionRef;
    return(value?: ExpressionRef): ExpressionRef;
    host(op: Op, name: string, operands: ExpressionRef[]): ExpressionRef;
    nop(): ExpressionRef;
    unreachable(): ExpressionRef;
    notify(ptr: ExpressionRef, wakeCount: ExpressionRef): ExpressionRef;

    addFunctionType(name: string, resultType: Type, paramTypes: Type[]): FunctionTypeRef;
    getFunctionTypeBySignature(resultType: Type, paramTypes: Type[]): FunctionTypeRef;
    removeFunctionType(name: string): void;
    addFunction(name: string, functionType: FunctionTypeRef, varTypes: Type[], body: ExpressionRef): FunctionRef;
    getFunction(name: string): FunctionRef;
    removeFunction(name: string): void;
    addGlobal(name: string, type: Type, mutable: boolean, init: ExpressionRef): GlobalRef;
    getGlobal(name: string): GlobalRef;
    removeGlobal(name: string): void;
    addFunctionImport(internalName: string, externalModuleName: string, externalBaseName: string, functionType: FunctionTypeRef): ImportRef;
    addTableImport(internalName: string, externalModuleName: string, externalBaseName: string): ImportRef;
    addMemoryImport(internalName: string, externalModuleName: string, externalBaseName: string): ImportRef;
    addGlobalImport(internalName: string, externalModuleName: string, externalBaseName: string, globalType: Type): ImportRef;
    addFunctionExport(internalName: string, externalName: string): ExportRef;
    addTableExport(internalName: string, externalName: string): ExportRef;
    addMemoryExport(internalName: string, externalName: string): ExportRef;
    addGlobalExport(internalName: string, externalName: string): ExportRef;
    removeExport(externalName: string): void;
    setFunctionTable(initial: number, maximum: number, funcs: number[]): void;
    setMemory(initial: number, maximum: number, exportName?: string | null, segments?: MemorySegment[] | null, flags?: number[] | null, shared?: boolean): void;
    setStart(start: FunctionRef): void;
    getFeatures(): FeatureFlags;
    setFeatures(features: FeatureFlags): void;
    emitText(): string;
    emitStackIR(optimize?: boolean): string;
    emitAsmjs(): string;
    validate(): number;
    optimize(): void;
    optimizeFunction(func: string | FunctionRef): void;
    runPasses(passes: string[]): void;
    runPassesOnFunction(func: string | FunctionRef, passes: string[]): void;
    autoDrop(): void;
    dispose(): void;
    emitBinary(): Uint8Array;
    emitBinary(sourceMapUrl: string | null): { binary: Uint8Array; sourceMap: string | null; };
    interpret(): void;
    addDebugInfoFileName(filename: string): number;
    getDebugInfoFileName(index: number): string | null;
    setDebugLocation(func: FunctionRef, expr: ExpressionRef, fileIndex: number, lineNumber: number, columnNumber: number): void;
  }

  function wrapModule(ptr: number): Module;

  function getExpressionId(expression: ExpressionRef): number;
  function getExpressionType(expression: ExpressionRef): Type;
  function getExpressionInfo(expression: ExpressionRef): ExpressionInfo;

  interface ExpressionInfo {
    id: ExpressionId;
    type: Type;
  }

  interface BlockInfo extends ExpressionInfo {
    name: string;
    children: ExpressionRef[];
  }

  interface IfInfo extends ExpressionInfo {
    condition: ExpressionRef;
    ifTrue: ExpressionRef;
    ifFalse: ExpressionRef;
  }

  interface LoopInfo extends ExpressionInfo {
    name: string;
    body: ExpressionRef;
  }

  interface BreakInfo extends ExpressionInfo {
    name: string;
    condition: ExpressionRef;
    value: ExpressionRef;
  }

  interface SwitchInfo extends ExpressionInfo {
    names: string[];
    defaultName: string | null;
    condition: ExpressionRef;
    value: ExpressionRef;
  }

  interface CallInfo extends ExpressionInfo {
    target: string;
    operands: ExpressionRef[];
  }

  interface CallIndirectInfo extends ExpressionInfo {
    target: ExpressionRef;
    operands: ExpressionRef[];
  }

  interface LocalGetInfo extends ExpressionInfo {
    index: number;
  }

  interface LocalSetInfo extends ExpressionInfo {
    isTee: boolean;
    index: number;
    value: ExpressionRef;
  }

  interface GlobalGetInfo extends ExpressionInfo {
    name: string;
  }

  interface GlobalSetInfo extends ExpressionInfo {
    name: string;
    value: ExpressionRef;
  }

  interface LoadInfo extends ExpressionInfo {
    isAtomic: boolean;
    isSigned: boolean;
    offset: number;
    bytes: number;
    align: number;
    ptr: ExpressionRef;
  }

  interface StoreInfo extends ExpressionInfo {
    isAtomic: boolean;
    offset: number;
    bytes: number;
    align: number;
    ptr: ExpressionRef;
    value: ExpressionRef;
  }

  interface ConstInfo extends ExpressionInfo {
    value: number | { low: number, high: number };
  }

  interface UnaryInfo extends ExpressionInfo {
    op: Op;
    value: ExpressionRef;
  }

  interface BinaryInfo extends ExpressionInfo {
    op: Op;
    left: ExpressionRef;
    right: ExpressionRef;
  }

  interface SelectInfo extends ExpressionInfo {
    ifTrue: ExpressionRef;
    ifFalse: ExpressionRef;
    condition: ExpressionRef;
  }

  interface DropInfo extends ExpressionInfo {
    value: ExpressionRef;
  }

  interface ReturnInfo extends ExpressionInfo {
    value: ExpressionRef;
  }

  interface NopInfo extends ExpressionInfo {
  }

  interface UnreachableInfo extends ExpressionInfo {
  }

  interface HostInfo extends ExpressionInfo {
    op: Op;
    nameOperand: string | null;
    operands: ExpressionRef[];
  }

  interface AtomicRMWInfo extends ExpressionInfo {
    op: Op;
    bytes: number;
    offset: number;
    ptr: ExpressionRef;
    value: ExpressionRef;
  }

  interface AtomicCmpxchgInfo extends ExpressionInfo {
    bytes: number;
    offset: number;
    ptr: ExpressionRef;
    expected: ExpressionRef;
    replacement: ExpressionRef;
  }

  interface AtomicWaitInfo extends ExpressionInfo {
    ptr: ExpressionRef;
    expected: ExpressionRef;
    timeout: ExpressionRef;
    expectedType: Type;
  }

  interface AtomicNotifyInfo extends ExpressionInfo {
    ptr: ExpressionRef;
    notifyCount: ExpressionRef;
  }

  interface SIMDExtractInfo extends ExpressionInfo {
    op: Op;
    vec: ExpressionRef;
    index: ExpressionRef;
  }

  interface SIMDReplaceInfo extends ExpressionInfo {
    op: Op;
    vec: ExpressionRef;
    index: ExpressionRef;
    value: ExpressionRef;
  }

  interface SIMDShuffleInfo extends ExpressionInfo {
    left: ExpressionRef;
    right: ExpressionRef;
    mask: number[];
  }

  interface SIMDBitselectInfo extends ExpressionInfo {
    left: ExpressionRef;
    right: ExpressionRef;
    cond: ExpressionRef;
  }

  interface SIMDShiftInfo extends ExpressionInfo {
    op: Op;
    vec: ExpressionRef;
    shift: ExpressionRef;
  }

  interface MemoryInitInfo extends ExpressionInfo {
    segment: number;
    dest: ExpressionRef;
    offset: ExpressionRef;
    size: ExpressionRef;
  }

  interface MemoryDropInfo extends ExpressionInfo {
    segment: number;
  }

  interface MemoryCopyInfo extends ExpressionInfo {
    dest: ExpressionRef;
    source: ExpressionRef;
    size: ExpressionRef;
  }

  interface MemoryFillInfo extends ExpressionInfo {
    dest: ExpressionRef;
    value: ExpressionRef;
    size: ExpressionRef;
  }

  function getFunctionTypeInfo(ftype: FunctionTypeRef): FunctionTypeInfo;

  interface FunctionTypeInfo {
    name: string;
    params: Type[];
    result: Type;
  }

  function getFunctionInfo(func: FunctionRef): FunctionInfo;

  interface FunctionInfo {
    name: string;
    module: string | null;
    base: string | null;
    type: FunctionTypeRef;
    params: Type[];
    result: Type;
    vars: Type[];
    body: ExpressionRef;
  }

  function getGlobalInfo(global: GlobalRef): GlobalInfo;

  interface GlobalInfo {
    name: string;
    module: string | null;
    base: string | null;
    type: Type;
    mutable: boolean;
    init: ExpressionRef;
  }

  function getExportInfo(export_: ExportRef): ExportInfo;

  interface ExportInfo {
    kind: ExternalKind;
    name: string;
    value: string;
  }

  function emitText(expression: ExpressionRef): string;
  function readBinary(data: Uint8Array): Module;
  function parseText(text: string): Module;
  function getOptimizeLevel(): number;
  function setOptimizeLevel(level: number): number;
  function getShrinkLevel(): number;
  function setShrinkLevel(level: number): number;
  function getDebugInfo(): boolean;
  function setDebugInfo(on: boolean): void;
  function setAPITracing(on: boolean): void;
  function exit(status: number): void;

  type RelooperBlockRef = number;

  class Relooper {
    constructor(module: Module);
    addBlock(expression: ExpressionRef): RelooperBlockRef;
    addBranch(from: RelooperBlockRef, to: RelooperBlockRef, condition: ExpressionRef, code: ExpressionRef): void;
    addBlockWithSwitch(code: ExpressionRef, condition: ExpressionRef): RelooperBlockRef;
    addBranchForSwitch(from: RelooperBlockRef, to: RelooperBlockRef, indexes: number[], code: ExpressionRef): void;
    renderAndDispose(entry: RelooperBlockRef, labelHelper: number): ExpressionRef;
  }
}

export = binaryen;

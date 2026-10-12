import binaryen from "../index.js";

const module = new binaryen.Module();
const table = module.addTable("dispatch", 1, 1);
const segments: binaryen.ElementSegmentRef[] = module.getTableSegments(table);
const info = binaryen.getElementSegmentInfo(segments[0]);
const segmentName: string = info.name;

// A table name is not a table reference accepted by the runtime.
// @ts-expect-error
module.getTableSegments("dispatch");

// Element references are not names accepted by getElementSegment.
// @ts-expect-error
const names: string[] = segments;

module.dispose();

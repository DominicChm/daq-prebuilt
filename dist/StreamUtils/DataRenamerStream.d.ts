/// <reference types="node" />
import { Transform, TransformCallback } from "stream";
import { SchemaManager } from "../SchemaManager/SchemaManager";
/**
 * Maps a data stream to use module names rather than UUIDs, as a step in converting to user-readable CSV.
 */
export declare class DataRenamerStream extends Transform {
    private readonly _map;
    constructor(schemaManager: SchemaManager);
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void;
}
//# sourceMappingURL=DataRenamerStream.d.ts.map
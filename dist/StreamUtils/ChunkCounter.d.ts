/// <reference types="node" />
import { Transform, TransformCallback } from "stream";
export declare class ChunkCounter extends Transform {
    private _value;
    private _valuePerChunk;
    private _key;
    constructor(startValue: number, valuePerChunk: number, key: string);
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void;
    key(): Symbol | string;
}
//# sourceMappingURL=ChunkCounter.d.ts.map
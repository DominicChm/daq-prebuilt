/// <reference types="node" />
import { Transform, TransformCallback } from "stream";
export declare class ChunkLimiter extends Transform {
    private _limit;
    private _counted;
    constructor(limit: number);
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void;
    reset(): this;
    setLimit(limit: number, reset?: boolean): this;
}
//# sourceMappingURL=ChunkLimiter.d.ts.map
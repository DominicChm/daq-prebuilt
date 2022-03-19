/// <reference types="node" />
import { Transform, TransformCallback } from "stream";
export declare class CSVEncoderStream extends Transform {
    private _frameInterval;
    private _time;
    private _headerWritten;
    constructor(frameInterval?: number);
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void;
}
//# sourceMappingURL=CSVEncoderStream.d.ts.map
/// <reference types="node" />
import { Transform, TransformCallback } from "stream";
export declare class TemporalStream extends Transform {
    private _interval;
    constructor(interval?: number);
    setInterval(interval: number): void;
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void;
    pauseStream(): void;
    resumeStream(): void;
}
//# sourceMappingURL=TemporalStream.d.ts.map
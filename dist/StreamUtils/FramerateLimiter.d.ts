/// <reference types="node" />
import { Transform, TransformCallback } from "stream";
export declare class FramerateLimiter extends Transform {
    private _interval;
    private bufferedChunk;
    private timeoutHandle;
    constructor(interval?: number);
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void;
    handleTimeout(): void;
    setInterval(interval: number): void;
    interval(): number;
    _flush(callback: TransformCallback): void;
}
//# sourceMappingURL=FramerateLimiter.d.ts.map
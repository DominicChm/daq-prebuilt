/// <reference types="node" />
import { Transform, TransformCallback } from "stream";
export declare class StreamPauser extends Transform {
    private _pausedCallback;
    constructor();
    pauseStream(): void;
    resumeStream(): void;
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void;
}
//# sourceMappingURL=StreamPauser.d.ts.map
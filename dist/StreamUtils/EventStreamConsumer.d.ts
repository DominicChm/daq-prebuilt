/// <reference types="node" />
import { Writable } from "stream";
export declare class EventStreamConsumer extends Writable {
    constructor();
    _write(chunk: any, encoding: BufferEncoding, callback: (error?: (Error | null)) => void): void;
}
//# sourceMappingURL=EventStreamConsumer.d.ts.map
/// <reference types="node" />
import { PlaybackManager } from "../PlaybackManager";
import { StoredRun } from "./StoredRun";
import { Readable } from "stream";
import { ChunkCounter, FramerateLimiter, TemporalStream } from "../../StreamUtils";
export declare class StoredPlaybackManager extends PlaybackManager {
    private _run;
    private _stream;
    private _streamChunks;
    private _seekThrottle;
    constructor(run: StoredRun, convertData: boolean);
    destroy(): this;
    setScale(scale?: number): this;
    setFramerate(rate?: number): this;
    seekTo(time?: number): this;
    _execSeek(): void;
    createStreamChunks(): {
        readStream: Readable;
        temporalStream: TemporalStream;
        counter: ChunkCounter;
        limiter: FramerateLimiter;
    };
    pause(): this;
    play(): this;
    position(): number;
    stop(): this;
}
//# sourceMappingURL=StoredPlaybackManager.d.ts.map
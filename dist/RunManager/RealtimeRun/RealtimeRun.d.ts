/// <reference types="node" />
import { RunHandle } from "../RunHandle";
import { RealtimePlaybackManager } from "./RealtimePlaybackManager";
import { Readable } from "stream";
/**
 * Describes a run that's happening "right now". Used for streaming data from modules in real-time.
 */
export declare class RealtimeRun extends RunHandle {
    private _rootConvertedStream;
    constructor(uuid: string, schemaPath: string, metaPath: string);
    feedData(data: any): void;
    getPlayManager(convertData: boolean): RealtimePlaybackManager;
    getDataStream(time: number, convert: boolean): Readable;
}
//# sourceMappingURL=RealtimeRun.d.ts.map
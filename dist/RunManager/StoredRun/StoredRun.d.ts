/// <reference types="node" />
import fs from "fs-extra";
import { RunHandle } from "../RunHandle";
import { RealtimeRun } from "../RealtimeRun/RealtimeRun";
import { StoredPlaybackManager } from "./StoredPlaybackManager";
import { Readable } from "stream";
export declare const paths: {
    lockFile: string;
    data: string;
    schema: string;
    meta: string;
};
/**
 * Describes a run that happened in the past. Allows playback and writing of data.
 */
export declare class StoredRun extends RunHandle {
    private readonly _rootPath;
    private _isWriting;
    private _writeStream;
    private _size;
    constructor(uuid: string, rootPath: string);
    getPlayManager(convertData: boolean): StoredPlaybackManager;
    lockForWriting(): this;
    unlock(): this;
    locked(): boolean;
    resolve(path: string): string;
    writeRaw(data: Uint8Array): void;
    /**
     * Encodes and writes data that matches this run's schema.
     * @param data
     */
    writeFrame(data: any): void;
    dataPath(): string;
    lockfilePath(): string;
    link(run: RealtimeRun): this;
    unlink(): this;
    delete(): this;
    size(): number;
    toJSON(): {
        locked: boolean;
        size: number;
        id: any;
        type: any;
        meta: import("../schemas/RunMeta").IRunMetaSchema;
    };
    destroy(): void;
    getDataStream(time: number, convert: boolean): Readable;
    getRawStream(time: number): fs.ReadStream;
}
//# sourceMappingURL=StoredRun.d.ts.map
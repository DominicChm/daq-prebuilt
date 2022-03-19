/// <reference types="node" />
import { FileSchemaManager } from "../SchemaManager/FileSchemaManager";
import { TypedEmitter } from "tiny-typed-emitter";
import { PlaybackManager } from "./PlaybackManager";
import { RunEvents } from "./interfaces/RunEvents";
import { RunMetaManager } from "./RunMetaManager";
import { Stream } from "stream";
import { CTypeStream, DataConverterStream } from "../StreamUtils";
export declare abstract class RunHandle extends TypedEmitter<RunEvents> {
    private readonly _uuid;
    private readonly _runType;
    private readonly _schemaManager;
    private readonly _metaManager;
    private _destroyed;
    protected constructor(runType: string, uuid: string, schemaPath: string, metaPath: string, metaReadonly: boolean);
    uuid(): string;
    schemaManager(): FileSchemaManager;
    toJSON(): {
        id: any;
        type: any;
        meta: import("./schemas/RunMeta").IRunMetaSchema;
    };
    destroy(): void;
    destroyed(): boolean;
    abstract getPlayManager(convertData: boolean): PlaybackManager;
    metaManager(): RunMetaManager;
    abstract getDataStream(time: number, convert: boolean): Stream;
    getConversionTransform(): DataConverterStream;
    getCTypeTransform(): CTypeStream;
}
//# sourceMappingURL=RunHandle.d.ts.map
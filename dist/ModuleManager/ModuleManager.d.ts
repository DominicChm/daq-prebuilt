import { RealtimeRun } from "../RunManager/RealtimeRun/RealtimeRun";
import { ModuleInstance } from "../SchemaManager/ModuleInstance";
import { DAQSchema } from "../SchemaManager/interfaces/DAQSchema";
import { TypedEmitter } from "tiny-typed-emitter";
export interface ModuleManagerOptions {
    mqttUrl: string;
    schemaPath: string;
    realtimeMetaPath: string;
    aggregationWindow: number;
}
interface ModuleManagerEvents {
}
/**
 * Facilitates interactions with remote modules. Sets up and tears down MQTT and provides a RealtimeRun
 * to stream data from modules.
 */
export declare class ModuleManager extends TypedEmitter<ModuleManagerEvents> {
    private _opts;
    private readonly _mqtt;
    private readonly _router;
    private readonly _run;
    private _bindings;
    private _frameTimer;
    private _data;
    constructor(opts: ModuleManagerOptions);
    /**
     * Updates the framerate timer when the DAQ schema has a breaking change (possibly framerate).
     */
    onFormatBroken(): void;
    schemaManager(): import("../SchemaManager/FileSchemaManager").FileSchemaManager;
    initInstances(schema: DAQSchema, instances: ModuleInstance[]): void;
    bindInstance(instance: ModuleInstance): void;
    rebindInstance(instance: ModuleInstance): void;
    /**
     * Ingests parsed, JSON data from modules.
     */
    private gatherData;
    private dispatchData;
    unbindInstance(instance: ModuleInstance): void;
    getRuns(): RealtimeRun[];
}
export {};
//# sourceMappingURL=ModuleManager.d.ts.map
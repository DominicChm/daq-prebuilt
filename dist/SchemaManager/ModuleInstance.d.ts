/// <reference types="node" />
import { ModuleDefinition } from "./interfaces/ModuleDefinition";
import { TypedEmitter } from "tiny-typed-emitter";
import { ModuleTypeDriver } from "./ModuleTypeDriver";
import { ModuleInstanceEvents } from "./interfaces/ModuleInstanceEvents";
/**
 * Manages individual module functions by merging a type definition with an instance definition.
 * Drives a ModuleTypeDefinition. Handles mutation of module definition and linking events,
 * as well as data serialization and deserialization.
 *
 * The moduleDefinition this holds is DIFFERENT to what is persisted!!!
 * It holds the total config in its definition.
 */
export declare class ModuleInstance extends TypedEmitter<ModuleInstanceEvents> {
    private readonly _moduleType;
    private _definition;
    private _data;
    private _config;
    constructor(moduleType: ModuleTypeDriver, moduleDefinition: ModuleDefinition);
    /**
     * Converts stored data in JSON format (After the "feed" stage) into something understandable by humans.
     * EX: Converts and scales raw brake pressure values (0-1023) into PSI.
     * @protected
     * @param storedData
     */
    protected convertStored(storedData: any): any;
    /**
     * Converts raw data in JSON format (After the "feed" stage) into something understandable by humans.
     * EX: Converts and scales raw brake pressure values (0-1023) into PSI.
     * @protected
     * @param rawData
     */
    protected convertRaw(rawData: any): any;
    /**
     *
     * @param def
     * @return {boolean} - Whether the passed definition potentially broke bindings
     */
    setDefinition(def: ModuleDefinition): boolean;
    /**
     * Returns this instance's config, encoded into binary.
     */
    replicatedBinConfig(): ArrayBuffer;
    replicatedConfig(): any;
    totalConfig(): Object;
    persistentConfig(): any;
    persistentDefinition(): ModuleDefinition;
    mac(): string;
    id(): string;
    name(): string;
    data(): any;
    /**
     * Used to feed raw, binary data from a transport layer into the instance.
     * It parses the data and re-emits it as JSON as well as preserving it for future access.
     * @param payload
     * TODO: Emit parse errors using eventemitter
     */
    feedRaw(payload: Buffer): any;
    definition(): ModuleDefinition;
    typeDriver(): ModuleTypeDriver;
    stored2human(data: any): any;
}
//# sourceMappingURL=ModuleInstance.d.ts.map
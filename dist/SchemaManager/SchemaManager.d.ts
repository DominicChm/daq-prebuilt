import { DAQSchema } from "./interfaces/DAQSchema";
import { ModuleInstance } from "./ModuleInstance";
import { ModuleDefinition } from "./interfaces/ModuleDefinition";
import { TypedEmitter } from "tiny-typed-emitter";
import { ModuleTypeDriver } from "./ModuleTypeDriver";
import { CType } from "c-type-util";
import { InstanceManager } from "./InstanceManager";
import { SchemaManagerEvents } from "./interfaces/SchemaManagerEvents";
import { SchemaManagerOptions } from "./interfaces/SchemaManagerOptions";
/**
 * Manages a DAQSchema. Handles mutation, loading, and unloading.
 */
export declare class SchemaManager extends TypedEmitter<SchemaManagerEvents> {
    private _schema;
    private _instanceManager;
    private readonly _opts;
    private readonly _moduleTypeDrivers;
    constructor(opts?: Partial<SchemaManagerOptions>);
    setAllowBreaking(val: boolean): this;
    moduleTypes(): import("./interfaces/ModuleTypeDefinition").ModuleTypeDefinition[];
    moduleDrivers(): ModuleTypeDriver[];
    doesNewSchemaBreak(schema: DAQSchema): boolean;
    /**
     * Loads a new schema. If the new schema requires a full reload (a new module is added, or a dependency breaks)
     * the current schema is unloaded first. If a full reload isn't required, it just updates current instances.
     * @param schema
     * @param fullReload
     */
    load(schema: DAQSchema, fullReload?: boolean): this;
    /**
     * Validates and returns a passed module definition, based on its typename.
     * @param def
     * @private
     */
    private validateDefinition;
    /**
     * Returns the current Schema.
     */
    schema(): DAQSchema;
    persistentSchema(): DAQSchema;
    createNewModuleDefinition(typeName: string): void;
    /**
     * Resolves a typename to a ModuleTypeDriver
     * @param typeName - The typename that corresponds to a ModuleType
     */
    findDriver(typeName: string): ModuleTypeDriver;
    /**
     * Validates and adds a moduleDefinition to this schema
     * @param def - the ModuleDefinition to add.
     */
    addModule(def: ModuleDefinition): this;
    /**
     * Used to run a load listener on (for example) class instantiation, if a schema has already been loaded.
     * @param listener
     */
    initLoadListener(listener: (schema: DAQSchema, instances: ModuleInstance[]) => void): void;
    rawCType(): void;
    storedCType(): CType<any>;
    instanceManager(): InstanceManager;
    frameInterval(): number;
    isLoaded(): boolean;
}
//# sourceMappingURL=SchemaManager.d.ts.map
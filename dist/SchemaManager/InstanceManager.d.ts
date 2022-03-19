import { SchemaManager } from "./SchemaManager";
import { ModuleDefinition } from "./interfaces/ModuleDefinition";
import { ModuleInstance } from "./ModuleInstance";
import { TypedEmitter } from "tiny-typed-emitter";
import { InstanceManagerEvents } from "./interfaces/InstanceManagerEvents";
/**
 * Creates and manages updates for ModuleInstances
 */
export declare class InstanceManager extends TypedEmitter<InstanceManagerEvents> {
    private _schemaManager;
    private _instances;
    private _converters;
    constructor(manager: SchemaManager);
    /**
     * Checks a module instance against a new definition for any entirely incompatible changes,
     * like a type change.
     * @private
     */
    private isInstanceInvalid;
    private definitionToMap;
    /**
     * Loads and validates passed definitions
     * @param defs
     * @param throwOnBreak
     * @param rebindAll
     */
    loadModuleDefinitions(defs: ModuleDefinition[], throwOnBreak?: boolean, rebindAll?: boolean): {
        definitions: ModuleDefinition[];
        loadResults: {
            created: number;
            changed: number;
            deleted: number;
        };
    };
    /**
     * Returns mapped definitions with type changed definitions replaced with new instances.
     * Replaced definitions have new UUIDs so old instances are picked up by the cleanup code.
     * @param mappedDefs
     * @param throwOnBreak
     * @private
     */
    private preprocessDefinition;
    private moduleDefinitions;
    /**
     * Find an instance based on the passed MAC ID.
     * @param uuid
     */
    instance(uuid: string): ModuleInstance | undefined;
    instances(): ModuleInstance[];
    raw2human(rawData: any): any;
}
//# sourceMappingURL=InstanceManager.d.ts.map
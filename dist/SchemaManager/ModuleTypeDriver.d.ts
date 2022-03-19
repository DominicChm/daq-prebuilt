import { ModuleTypeDefinition } from "./interfaces/ModuleTypeDefinition";
import { CType } from "c-type-util";
import { ModuleDefinition } from "./interfaces/ModuleDefinition";
/**
 * Drives and allows easy interaction with a ModuleTypeDefinition, which describes a type of module.
 */
export declare class ModuleTypeDriver {
    private readonly _typeDefinition;
    private readonly _totalConfigSchema;
    private readonly _persistentDefinitionSchema;
    private readonly _replicatedConfigSchema;
    private readonly _persistentConfigSchema;
    private readonly _definitionSchema;
    private _rawCType;
    private _replicatedConfigCType;
    constructor(typeDef: ModuleTypeDefinition);
    typeHash(): number;
    /**
     * Returns a default configuration for this type.
     */
    defaultConfig(): any;
    /**
     * Returns a default module definition for this type.
     */
    newDefinition(id?: string): any;
    /**
     * Creates a new definition of this type with the same name, uuid, id, etc... as the passed.
     */
    deriveDefinition(definition: ModuleDefinition): ModuleDefinition;
    /**
     * Validates the passed config against this type's total (combined) configuration.
     * @param config
     */
    validateTotalConfig(config: any): any;
    validateReplicatedConfig(config: any): any;
    validatePersistentConfig(config: any): any;
    /**
     * Validates a module definition for this type.
     * @param config
     */
    validatePersistentDefinition(config: any): any;
    validateDefinition(config: any): any;
    typeName(): string;
    typeDefinition(): ModuleTypeDefinition;
    stored2Human(raw: any, config: any): any;
    raw2Human(raw: any, config: any): any;
    rawCType(): CType<any>;
    storageCType(): CType<any>;
    replicatedConfigCType(): CType<any>;
}
//# sourceMappingURL=ModuleTypeDriver.d.ts.map
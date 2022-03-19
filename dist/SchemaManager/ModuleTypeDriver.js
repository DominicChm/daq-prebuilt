"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleTypeDriver = void 0;
const joi_1 = __importDefault(require("joi"));
const c_type_util_1 = require("c-type-util");
const uuid_1 = require("uuid");
const ModuleDefinition_1 = require("./schemas/ModuleDefinition");
const CommonReplicatedModuleConfig_1 = require("./schemas/CommonReplicatedModuleConfig");
const util_1 = require("../Util/util");
const CommonRawCTypes_1 = require("./schemas/CommonRawCTypes");
/**
 * Drives and allows easy interaction with a ModuleTypeDefinition, which describes a type of module.
 */
class ModuleTypeDriver {
    constructor(typeDef) {
        this._typeDefinition = typeDef;
        // Schema that's used to validate incoming schema sets.
        this._totalConfigSchema = joi_1.default.object({
            ...CommonReplicatedModuleConfig_1.CommonReplicatedModuleConfig,
            ...this._typeDefinition.replicatedConfigSchema,
            ...this._typeDefinition.persistentConfigSchema
        });
        this._replicatedConfigSchema = joi_1.default.object({
            ...CommonReplicatedModuleConfig_1.CommonReplicatedModuleConfig,
            ...this._typeDefinition.replicatedConfigSchema
        });
        this._persistentConfigSchema = joi_1.default.object(this._typeDefinition.persistentConfigSchema);
        this._persistentDefinitionSchema = ModuleDefinition_1.ModuleDefinitionSchema({
            configSchema: this._persistentConfigSchema,
            typename: typeDef.typeName,
            defaultName: `New ${typeDef.typeName}`,
            defaultConfig: this.defaultConfig(),
        });
        // The schema used to do validation at runtime.
        this._definitionSchema = ModuleDefinition_1.ModuleDefinitionSchema({
            configSchema: this._totalConfigSchema,
            typename: typeDef.typeName,
            defaultName: `New ${typeDef.typeName}`,
            defaultConfig: this.defaultConfig(),
        });
        this._rawCType = c_type_util_1.cStruct({
            ...CommonRawCTypes_1.CommonRawCTypes,
            ...this._typeDefinition.rawCType,
        });
        this._replicatedConfigCType = c_type_util_1.cStruct({
            ...CommonReplicatedModuleConfig_1.CommonConfigCTypes,
            ...this._typeDefinition.replicatedConfigCType
        });
    }
    typeHash() {
        return util_1.hashCode(this.typeName());
    }
    /**
     * Returns a default configuration for this type.
     */
    defaultConfig() {
        try {
            //2 validation passes - 1 to generate defaults, 2 to validate that the default config is valid.
            const cfg = joi_1.default.attempt({
                typeNameHash: util_1.hashCode(this.typeName())
            }, this._totalConfigSchema, { noDefaults: false });
            return this.validateTotalConfig(cfg);
        }
        catch (e) {
            throw new Error(`Error creating a default config! MAKE SURE ALL CONFIG SCHEMA FIELDS IN >${this._typeDefinition.typeName}< HAVE A DEFAULT!!! - ${e.message}`);
        }
    }
    /**
     * Returns a default module definition for this type.
     */
    newDefinition(id = uuid_1.v4()) {
        try {
            const def = joi_1.default.attempt({ id }, this._persistentDefinitionSchema, { noDefaults: false });
            return this.validateDefinition(def);
        }
        catch (e) {
            throw new Error(`Error creating a default definition! MAKE SURE ALL CONFIG SCHEMA FIELDS IN >${this._typeDefinition.typeName}< HAVE A DEFAULT!!! - ${e.message}`);
        }
    }
    /**
     * Creates a new definition of this type with the same name, uuid, id, etc... as the passed.
     */
    deriveDefinition(definition) {
        return {
            ...this.newDefinition(),
            name: definition.name,
            description: definition.description,
            mac: definition.mac,
        };
    }
    /**
     * Validates the passed config against this type's total (combined) configuration.
     * @param config
     */
    validateTotalConfig(config) {
        return joi_1.default.attempt(config, this._totalConfigSchema, { noDefaults: true, presence: "required" });
    }
    validateReplicatedConfig(config) {
        return joi_1.default.attempt(config, this._replicatedConfigSchema, {
            noDefaults: true,
            presence: "required",
            stripUnknown: true
        });
    }
    validatePersistentConfig(config) {
        return joi_1.default.attempt(config, this._persistentConfigSchema, {
            noDefaults: true,
            presence: "required",
            stripUnknown: true
        });
    }
    /**
     * Validates a module definition for this type.
     * @param config
     */
    validatePersistentDefinition(config) {
        return joi_1.default.attempt(config, this._persistentDefinitionSchema, {
            noDefaults: true,
            presence: "required",
            stripUnknown: true
        });
    }
    validateDefinition(config) {
        return joi_1.default.attempt(config, this._definitionSchema, {
            noDefaults: true,
            presence: "required",
            stripUnknown: true
        });
    }
    typeName() {
        return this._typeDefinition.typeName;
    }
    typeDefinition() {
        return this._typeDefinition;
    }
    stored2Human(raw, config) {
        return this._typeDefinition.stored2Human(raw, config);
    }
    raw2Human(raw, config) {
        return this._typeDefinition.raw2Human(raw, config, this._typeDefinition.stored2Human);
    }
    rawCType() {
        return this._rawCType;
    }
    storageCType() {
        return c_type_util_1.cStruct(this._typeDefinition.storageCType);
    }
    replicatedConfigCType() {
        return this._replicatedConfigCType;
    }
}
exports.ModuleTypeDriver = ModuleTypeDriver;
//# sourceMappingURL=ModuleTypeDriver.js.map
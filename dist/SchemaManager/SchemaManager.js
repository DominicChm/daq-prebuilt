"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaManager = void 0;
const lodash_1 = require("lodash");
const tiny_typed_emitter_1 = require("tiny-typed-emitter");
const moduleTypes_1 = require("../moduleTypes");
const ModuleTypeDriver_1 = require("./ModuleTypeDriver");
const logging_1 = require("../Util/logging");
const util_1 = require("../Util/util");
const c_type_util_1 = require("c-type-util");
const InstanceManager_1 = require("./InstanceManager");
const joi_1 = __importDefault(require("joi"));
const DAQSchema_1 = require("./schemas/DAQSchema");
const log = logging_1.logger("SchemaManager");
//TODO: ADD FRAMERATE/INTERVAL TO THE SCHEMA, AS A BREAKING PARAMETER.
/**
 * Manages a DAQSchema. Handles mutation, loading, and unloading.
 */
class SchemaManager extends tiny_typed_emitter_1.TypedEmitter {
    constructor(opts = {}) {
        super();
        this._schema = null;
        this._opts = {
            moduleTypes: moduleTypes_1.moduleTypeDefinitions,
            breakingAllowed: true,
            ...opts,
        };
        this._moduleTypeDrivers = moduleTypes_1.moduleTypeDefinitions.map(v => new ModuleTypeDriver_1.ModuleTypeDriver(v));
        //Validate drivers
        util_1.checkDuplicates(this._moduleTypeDrivers, m => m.typeName());
        util_1.checkDuplicates(this._moduleTypeDrivers, m => m.typeHash());
        this.load = this.load.bind(this);
        this.moduleTypes = this.moduleTypes.bind(this);
        this.createNewModuleDefinition = this.createNewModuleDefinition.bind(this);
        this.validateDefinition = this.validateDefinition.bind(this);
        this._instanceManager = new InstanceManager_1.InstanceManager(this);
    }
    setAllowBreaking(val) {
        this._opts.breakingAllowed = val;
        return this;
    }
    //Returns module types.
    moduleTypes() {
        return this._opts.moduleTypes;
    }
    moduleDrivers() {
        return this._moduleTypeDrivers;
    }
    doesNewSchemaBreak(schema) {
        return schema.frameInterval !== this.frameInterval();
    }
    /**
     * Loads a new schema. If the new schema requires a full reload (a new module is added, or a dependency breaks)
     * the current schema is unloaded first. If a full reload isn't required, it just updates current instances.
     * @param schema
     * @param fullReload
     */
    load(schema, fullReload = false) {
        schema = joi_1.default.attempt(schema, DAQSchema_1.DAQSchemaValidator);
        //Check schema for dupe IDs. Will throw if found.
        util_1.checkDuplicates(schema.modules, (m) => m.id);
        const loadedFlag = !this._schema;
        const broken = this.doesNewSchemaBreak(schema);
        const { loadResults, definitions } = this._instanceManager.loadModuleDefinitions(schema.modules, !this._opts.breakingAllowed);
        this._schema = {
            ...schema,
            modules: definitions
        };
        if (loadedFlag)
            this.emit("load", this.schema(), this.persistentSchema());
        else
            this.emit("update", this.schema(), this.persistentSchema());
        if (loadResults.deleted > 0 || loadResults.created > 0 || broken) {
            log("Format broken");
            this.emit("formatBroken", this.schema(), this.persistentSchema());
        }
        return this;
    }
    /**
     * Validates and returns a passed module definition, based on its typename.
     * @param def
     * @private
     */
    validateDefinition(def) {
        return this.findDriver(def.type).validateDefinition(def);
    }
    /**
     * Returns the current Schema.
     */
    schema() {
        if (!this._schema)
            throw new Error("No schema loaded!");
        return lodash_1.cloneDeep(this._schema);
    }
    persistentSchema() {
        return {
            ...this._schema,
            modules: this._instanceManager.instances().map(i => i.persistentDefinition()),
        };
    }
    //Adds a bare-minimum definition to the schema.
    createNewModuleDefinition(typeName) {
        this.addModule(this.findDriver(typeName).newDefinition());
    }
    /**
     * Resolves a typename to a ModuleTypeDriver
     * @param typeName - The typename that corresponds to a ModuleType
     */
    findDriver(typeName) {
        const typeDriver = this.moduleDrivers().find((v) => v.typeName() === typeName);
        if (!typeDriver)
            throw new Error(`Couldn't find module with type >${typeName}< when creating definition!`);
        return typeDriver;
    }
    /**
     * Validates and adds a moduleDefinition to this schema
     * @param def - the ModuleDefinition to add.
     */
    addModule(def) {
        log(`Adding: ${def.mac}`);
        def = this.findDriver(def.type).validateDefinition(def);
        const s = this.schema();
        s.modules.push(def);
        this.load(s);
        return this;
    }
    /**
     * Used to run a load listener on (for example) class instantiation, if a schema has already been loaded.
     * @param listener
     */
    initLoadListener(listener) {
        if (this._schema)
            listener(this.schema(), this._instanceManager.instances());
    }
    rawCType() {
        // for (const instance of this._instances) {
        // }
    }
    storedCType() {
        const members = Object.fromEntries(this._instanceManager.instances().map(i => [i.id(), i.typeDriver().storageCType()]));
        return c_type_util_1.cStruct(members);
    }
    instanceManager() {
        return this._instanceManager;
    }
    frameInterval() {
        return this._schema?.frameInterval;
    }
    isLoaded() {
        return !!this._schema;
    }
}
exports.SchemaManager = SchemaManager;
//# sourceMappingURL=SchemaManager.js.map
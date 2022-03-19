"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleInstance = void 0;
const tiny_typed_emitter_1 = require("tiny-typed-emitter");
const util_1 = require("../Util/util");
/**
 * Manages individual module functions by merging a type definition with an instance definition.
 * Drives a ModuleTypeDefinition. Handles mutation of module definition and linking events,
 * as well as data serialization and deserialization.
 *
 * The moduleDefinition this holds is DIFFERENT to what is persisted!!!
 * It holds the total config in its definition.
 */
class ModuleInstance extends tiny_typed_emitter_1.TypedEmitter {
    constructor(moduleType, moduleDefinition) {
        super();
        util_1.bindThis(ModuleInstance, this);
        // Definition is initialized a little later
        this._definition = {};
        this._moduleType = moduleType;
        // Merge the persisted config with a default total config to make the held definition total.
        moduleDefinition.config = {
            ...moduleType.defaultConfig(),
            ...moduleType.validatePersistentConfig(moduleDefinition.config),
        };
        this.setDefinition(moduleDefinition);
    }
    /**
     * Converts stored data in JSON format (After the "feed" stage) into something understandable by humans.
     * EX: Converts and scales raw brake pressure values (0-1023) into PSI.
     * @protected
     * @param storedData
     */
    convertStored(storedData) {
        this._moduleType.stored2Human(storedData, this.totalConfig());
    }
    /**
     * Converts raw data in JSON format (After the "feed" stage) into something understandable by humans.
     * EX: Converts and scales raw brake pressure values (0-1023) into PSI.
     * @protected
     * @param rawData
     */
    convertRaw(rawData) {
        return this._moduleType.raw2Human(rawData, this.totalConfig());
    }
    /**
     *
     * @param def
     * @return {boolean} - Whether the passed definition potentially broke bindings
     */
    setDefinition(def) {
        this._definition = this._moduleType.validateDefinition(def); //Deep copy definition to leave original intact
        return false;
    }
    /**
     * Returns this instance's config, encoded into binary.
     */
    replicatedBinConfig() {
        return this._moduleType.replicatedConfigCType().allocLE(this.replicatedConfig());
    }
    replicatedConfig() {
        //console.log(this.totalConfig())
        return this._moduleType.validateReplicatedConfig(this.totalConfig());
    }
    totalConfig() {
        return this._definition.config;
    }
    persistentConfig() {
        return this._moduleType.validatePersistentConfig(this.totalConfig());
    }
    persistentDefinition() {
        return {
            ...this._definition,
            config: this.persistentConfig(),
        };
    }
    mac() {
        return this._definition.mac;
    }
    id() {
        return this._definition.id;
    }
    name() {
        return this._definition.name;
    }
    data() {
        return this._data;
    }
    /**
     * Used to feed raw, binary data from a transport layer into the instance.
     * It parses the data and re-emits it as JSON as well as preserving it for future access.
     * @param payload
     * TODO: Emit parse errors using eventemitter
     */
    feedRaw(payload) {
        //TODO: PARSE TIMESTAMPS FROM DATA
        //console.log("RAW INPUT :D");
        const data = this._moduleType.rawCType().readLE(payload.buffer, payload.byteOffset);
        this.emit("raw_data", payload, 0);
        this.emit("data", data, 0);
        return data;
    }
    definition() {
        return this._definition;
    }
    typeDriver() {
        return this._moduleType;
    }
    stored2human(data) {
        return this._moduleType.stored2Human(data, this.totalConfig());
    }
}
exports.ModuleInstance = ModuleInstance;
//# sourceMappingURL=ModuleInstance.js.map
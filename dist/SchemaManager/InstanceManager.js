"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanceManager = void 0;
const util_1 = require("../Util/util");
const ModuleInstance_1 = require("./ModuleInstance");
const lodash_1 = require("lodash");
const logging_1 = require("../Util/logging");
const tiny_typed_emitter_1 = require("tiny-typed-emitter");
const log = logging_1.logger("InstanceManager");
/**
 * Creates and manages updates for ModuleInstances
 */
class InstanceManager extends tiny_typed_emitter_1.TypedEmitter {
    constructor(manager) {
        super();
        this._instances = new Map();
        this._schemaManager = manager;
    }
    /**
     * Checks a module instance against a new definition for any entirely incompatible changes,
     * like a type change.
     * @private
     */
    isInstanceInvalid(instance, definition) {
        return instance.definition().type !== definition.type;
    }
    definitionToMap(def) {
        return new Map(def.map(d => [d.id, d]));
    }
    /**
     * Loads and validates passed definitions
     * @param defs
     * @param throwOnBreak
     * @param rebindAll
     */
    loadModuleDefinitions(defs, throwOnBreak = false, rebindAll = false) {
        util_1.checkDuplicates(defs, (m) => m.id);
        const mappedDefs = this.preprocessDefinition(this.definitionToMap(defs), throwOnBreak);
        let instances = new Map(this._instances);
        // Track IDs that have been modified
        const creations = new Map();
        const changes = new Map();
        const deletions = new Map();
        for (const [uuid, definition] of mappedDefs) {
            //Updates and creates instances.
            let instance = this.instance(uuid);
            const driver = this._schemaManager.findDriver(definition.type);
            if (!instance) {
                instance = new ModuleInstance_1.ModuleInstance(driver, definition);
                instances.set(uuid, instance);
                creations.set(uuid, instance);
                if (throwOnBreak)
                    throw new Error("Attempted creation of instance when schema breaking isn't allowed!");
                log(`CREATE >${uuid}<`);
            }
            else if (!lodash_1.isEqual(instance.definition(), definition)) {
                instance.setDefinition(definition);
                changes.set(uuid, instance);
                log(`UPDATE >${uuid}<`);
            }
        }
        // Identify uuids to be deleted.
        for (const [uuid, instance] of instances) {
            if (!mappedDefs.has(uuid)) {
                deletions.set(uuid, instance);
                if (throwOnBreak)
                    throw new Error("Attempted deletion of instance when schema breaking isn't allowed!");
                log(`DELETE >${uuid}<`);
            }
        }
        // At this point, instances holds both previous (deleted) and new (created) instances.
        deletions.forEach((i, uuid) => instances.delete(uuid));
        this._instances = instances;
        //Now that this class will return completely updated information, emit events and handle pre-load.
        deletions.forEach(i => this.emit("unbindInstance", i));
        creations.forEach(i => this.emit("bindInstance", i));
        if (rebindAll)
            instances.forEach(i => this.emit("rebindInstance", i));
        else
            changes.forEach(i => this.emit("rebindInstance", i));
        this._converters = new Map();
        for (const instance of this.instances()) {
            this._converters.set(instance.id(), instance.stored2human);
        }
        return {
            definitions: this.moduleDefinitions(),
            loadResults: {
                created: creations.size,
                changed: changes.size,
                deleted: deletions.size
            }
        };
    }
    /**
     * Returns mapped definitions with type changed definitions replaced with new instances.
     * Replaced definitions have new UUIDs so old instances are picked up by the cleanup code.
     * @param mappedDefs
     * @param throwOnBreak
     * @private
     */
    preprocessDefinition(mappedDefs, throwOnBreak = false) {
        for (const [uuid, definition] of mappedDefs) {
            const driver = this._schemaManager.findDriver(definition.type);
            const instance = this.instance(uuid);
            // Replace an invalid definition with an entirely new one.
            if (instance && this.isInstanceInvalid(instance, definition)) {
                if (throwOnBreak)
                    throw new Error("Attempted type-change of instance when schema breaking isn't allowed!");
                mappedDefs.delete(uuid);
                const derivedDef = driver.deriveDefinition(definition);
                mappedDefs.set(derivedDef.id, derivedDef);
                log(`TYPECHANGED >${instance.id()}<`);
            }
        }
        return mappedDefs;
    }
    moduleDefinitions() {
        return Array.from(this._instances).map(([uuid, instance]) => instance.definition());
    }
    /**
     * Find an instance based on the passed MAC ID.
     * @param uuid
     */
    instance(uuid) {
        return this._instances.get(uuid);
    }
    instances() {
        return Array.from(this._instances.values());
    }
    raw2human(rawData) {
        const convertedData = {};
        for (const [uuid, converter] of this._converters) {
            convertedData[uuid] = converter(rawData[uuid]);
        }
        return convertedData;
    }
}
exports.InstanceManager = InstanceManager;
//# sourceMappingURL=InstanceManager.js.map
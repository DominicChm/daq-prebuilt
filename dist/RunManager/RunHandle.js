"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunHandle = void 0;
const FileSchemaManager_1 = require("../SchemaManager/FileSchemaManager");
const tiny_typed_emitter_1 = require("tiny-typed-emitter");
const RunMetaManager_1 = require("./RunMetaManager");
const util_1 = require("../Util/util");
const StreamUtils_1 = require("../StreamUtils");
class RunHandle extends tiny_typed_emitter_1.TypedEmitter {
    constructor(runType, uuid, schemaPath, metaPath, metaReadonly) {
        super();
        this._destroyed = false;
        util_1.bindThis(RunHandle, this);
        this._uuid = uuid;
        this._runType = runType;
        this._schemaManager = new FileSchemaManager_1.FileSchemaManager(schemaPath);
        this._metaManager = new RunMetaManager_1.RunMetaManager(metaPath, metaReadonly);
        this.schemaManager().on("formatBroken", () => this.emit("formatChanged"));
    }
    uuid() {
        return this._uuid;
    }
    schemaManager() {
        return this._schemaManager;
    }
    toJSON() {
        return {
            id: this._uuid,
            type: this._runType,
            meta: this.metaManager().meta()
        };
    }
    destroy() {
        this.removeAllListeners();
        this._destroyed = true;
        this.emit("destroyed");
    }
    destroyed() {
        return this._destroyed;
    }
    metaManager() {
        return this._metaManager;
    }
    getConversionTransform() {
        return new StreamUtils_1.DataConverterStream(this.schemaManager().instanceManager());
    }
    getCTypeTransform() {
        return new StreamUtils_1.CTypeStream(this.schemaManager().storedCType());
    }
}
exports.RunHandle = RunHandle;
//# sourceMappingURL=RunHandle.js.map
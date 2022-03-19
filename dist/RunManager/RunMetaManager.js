"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunMetaManager = void 0;
const RunMeta_1 = require("./schemas/RunMeta");
const joi_1 = __importDefault(require("joi"));
const fs_extra_1 = require("fs-extra");
const tiny_typed_emitter_1 = require("tiny-typed-emitter");
const util_1 = require("../Util/util");
class RunMetaManager extends tiny_typed_emitter_1.TypedEmitter {
    constructor(path, readonly = false) {
        super();
        util_1.bindThis(RunMetaManager, this);
        this._path = path;
        //Do initial set BEFORE applying readonly.
        this.set(fs_extra_1.readJSONSync(this._path, { throws: false }) ?? {});
        this._readonly = readonly;
    }
    set(meta) {
        if (this._readonly)
            throw new Error("Run metadata is read-only!");
        meta = joi_1.default.attempt(meta, RunMeta_1.RunMetaSchema);
        this._meta = meta;
        this.emit("changed", this._meta);
        fs_extra_1.outputJSON(this._path, meta).catch(e => {
            throw e;
        });
    }
    name() {
        return this._meta.name;
    }
    //TODO: Ensure this can't be mutated.
    meta() {
        return this._meta;
    }
}
exports.RunMetaManager = RunMetaManager;
//# sourceMappingURL=RunMetaManager.js.map
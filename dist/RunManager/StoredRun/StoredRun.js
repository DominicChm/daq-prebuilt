"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoredRun = exports.paths = void 0;
const Path = __importStar(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const RunHandle_1 = require("../RunHandle");
const fs_1 = require("fs");
const StoredPlaybackManager_1 = require("./StoredPlaybackManager");
const util_1 = require("../../Util/util");
const StreamUtils_1 = require("../../StreamUtils");
exports.paths = {
    lockFile: "lock",
    data: "data.daq",
    schema: "schema.json",
    meta: "meta.json",
};
/**
 * Describes a run that happened in the past. Allows playback and writing of data.
 */
class StoredRun extends RunHandle_1.RunHandle {
    constructor(uuid, rootPath) {
        super("stored", uuid, Path.resolve(rootPath, exports.paths.schema), Path.resolve(rootPath, exports.paths.meta), false);
        this._size = 0;
        util_1.bindThis(StoredRun, this);
        this._rootPath = rootPath;
        this._isWriting = fs_extra_1.default.existsSync(this.resolve(exports.paths.lockFile));
        this.schemaManager().setAllowBreaking(false);
    }
    getPlayManager(convertData) {
        return new StoredPlaybackManager_1.StoredPlaybackManager(this, convertData);
    }
    lockForWriting() {
        fs_extra_1.default.ensureFileSync(this.lockfilePath());
        this._isWriting = true;
        this._writeStream = fs_extra_1.default.createWriteStream(this.dataPath());
        return this;
    }
    unlock() {
        fs_extra_1.default.removeSync(this.lockfilePath());
        this._isWriting = false;
        this._writeStream?.close();
        this._writeStream?.destroy();
        return this;
    }
    locked() {
        return this._isWriting;
    }
    resolve(path) {
        return Path.resolve(this._rootPath, path);
    }
    writeRaw(data) {
        if (!this._isWriting)
            throw new Error("Failed to write to run data - can only write if run is locked!");
        if (!this._writeStream)
            throw new Error("Failed to write to run data - no write stream!");
        this._writeStream.write(data);
    }
    /**
     * Encodes and writes data that matches this run's schema.
     * @param data
     */
    writeFrame(data) {
        const buf = this.schemaManager().storedCType().allocLE(data);
        this.writeRaw(new Uint8Array(buf));
    }
    dataPath() {
        return this.resolve(exports.paths.data);
    }
    lockfilePath() {
        return this.resolve(exports.paths.lockFile);
    }
    //Links this stored run to a realtime run. It will write chunks from the realtime run until stopped.
    link(run) {
        if (!run)
            throw new Error("Link failed - Run doesn't exist!");
        this.lockForWriting();
        //Copy the schema from the run we're linking to.
        this.schemaManager()
            .setAllowBreaking(true)
            .load(run.schemaManager().schema())
            .setAllowBreaking(false);
        const pm = run
            .getPlayManager(false)
            .callback(this.writeFrame)
            .setFramerate(0)
            .play();
        this.unlink = () => {
            this.unlock();
            pm.stop();
            this.emit("unlink");
            return this;
        };
        //Save a copy of the original schema in case future changes bork it.
        fs_1.cpSync(this.schemaManager().filePath(), Path.resolve(Path.dirname(this.schemaManager().filePath()), "schema.json.bak"));
        run.on("formatChanged", this.unlink);
        return this;
    }
    unlink() {
        this.unlock();
        this.emit("unlink");
        return this;
    }
    delete() {
        this.unlock();
        this.destroy();
        fs_extra_1.default.rmSync(this._rootPath, { recursive: true });
        return this;
    }
    size() {
        if (this.destroyed())
            return 0;
        if ((this._isWriting || !this._size) && fs_extra_1.default.existsSync(this.dataPath())) //Only update size if actively writing or no previous size.
            return this._size = fs_extra_1.default.statSync(this.dataPath()).size;
        else
            return this._size;
    }
    toJSON() {
        return {
            ...super.toJSON(),
            locked: this.locked(),
            size: this.size(),
        };
    }
    destroy() {
        this.unlink();
        super.destroy();
    }
    getDataStream(time, convert) {
        let frameInterval = this.schemaManager().frameInterval();
        if (frameInterval == null)
            throw new Error("Schema frameinterval is null.");
        let startPosition = Math.floor(time / frameInterval) * this.schemaManager().storedCType().size;
        const s = fs_extra_1.default.createReadStream(this.dataPath(), { start: startPosition })
            .pipe(new StreamUtils_1.CTypeStream(this.schemaManager().storedCType()));
        if (convert)
            return s.pipe(new StreamUtils_1.DataConverterStream(this.schemaManager().instanceManager()));
        else
            return s;
    }
    getRawStream(time) {
        let frameInterval = this.schemaManager().frameInterval();
        if (frameInterval == null)
            throw new Error("Schema frameinterval is null.");
        let startPosition = Math.floor(time / frameInterval) * this.schemaManager().storedCType().size;
        return fs_extra_1.default.createReadStream(this.dataPath(), { start: startPosition });
    }
}
exports.StoredRun = StoredRun;
//# sourceMappingURL=StoredRun.js.map
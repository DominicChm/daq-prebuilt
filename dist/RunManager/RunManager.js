"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunManager = void 0;
const RealtimeRun_1 = require("./RealtimeRun/RealtimeRun");
const StoredRun_1 = require("./StoredRun/StoredRun");
const RunHandle_1 = require("./RunHandle");
const uuid_1 = require("uuid");
const tiny_typed_emitter_1 = require("tiny-typed-emitter");
/**
 * Manages all components responsible for managing run data.
 * Central component for creating, removing, reading, and storing runs.
 */
class RunManager extends tiny_typed_emitter_1.TypedEmitter {
    constructor(fileManager, moduleManager) {
        super();
        this._runs = [];
        this._fileManager = fileManager ?? undefined;
        this._fileManager?.on("run_change", this.emitRunsChange.bind(this));
        this._moduleManager = moduleManager ?? undefined;
    }
    emitRunsChange() {
        this.emit("runChange", this.runs());
    }
    /**
     * Helper function to guard methods that need a FileManager to work.
     * @private
     */
    checkFM() {
        if (this._fileManager == null)
            throw new Error("Error - no filemanager!");
        return this._fileManager;
    }
    /**
     * Returns all held runs. Not cached, so always up-to-date.
     */
    runs() {
        //Return all run objects
        this._runs = [];
        if (this._fileManager)
            this._runs = this._runs.concat(this._fileManager.getRuns());
        if (this._moduleManager)
            this._runs = this._runs.concat(this._moduleManager.getRuns());
        //Filter destroyed runs.
        this._runs = this._runs.filter(r => !(r instanceof StoredRun_1.StoredRun && r.destroyed()));
        return this._runs;
    }
    /**
     * Find a run which is an instance of the passed run type, or any. Returns undefined if not found.
     * @param uuid - The UUID of the run to attempt to find
     * @param runType - The class to filter findable runs by (Realtime or Stored)
     */
    getRunByUUID(uuid, runType) {
        const run = this.runs().find(run => run.uuid() === uuid && (!runType || run instanceof runType));
        return run;
    }
    /**
     * Resolves either a run or string to a valid run. If one isn't found, this method throws.
     * @param run - A Run or run UUID
     * @param runType - Optional - the type of run to resolve.
     */
    resolveRun(run, runType) {
        let r = run;
        if (typeof run === "string")
            r = this.getRunByUUID(run, runType);
        if (!r || !(r instanceof RunHandle_1.RunHandle))
            throw new Error(`No run could be found with ID >${run}<`);
        return r;
    }
    /**
     * Initializes the storage of a RealtimeRun into a StoredRun.
     * @param run
     */
    beginRunStorage(run) {
        const fm = this.checkFM();
        const realtimeRun = this.resolveRun(run, RealtimeRun_1.RealtimeRun);
        fm.createStoredRun(uuid_1.v4())
            .link(realtimeRun)
            .on("unlink", this.emitRunsChange.bind(this));
        this.emitRunsChange();
    }
    /**
     * Unlinks a StoredRun from a RealtimeRun.
     * @param run - A run or UUID to stop
     */
    stopRunStorage(run) {
        this.resolveRun(run).unlink();
        this.emitRunsChange();
    }
    /**
     * What the name says - deletes a stored run. This action cannot be undone.
     * @param run - A run or UUID to delete
     */
    deleteStoredRun(run) {
        this.resolveRun(run, StoredRun_1.StoredRun).unlink().delete();
        this.emitRunsChange();
    }
    fileManager() {
        return this._fileManager;
    }
    moduleManager() {
        return this._moduleManager;
    }
    /**
     * Returns a simple object describing what capabilities this RunManager has, depending on what modules have been
     * loaded.
     */
    capabilities() {
        return {
            runTypes: {
                realtime: !!this._moduleManager,
                stored: !!this._fileManager
            }
        };
    }
}
exports.RunManager = RunManager;
//# sourceMappingURL=RunManager.js.map
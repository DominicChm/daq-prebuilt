"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientAgent = void 0;
const SIOChannels_1 = require("./SIOChannels");
const logging_1 = require("../Util/logging");
const util_1 = require("../Util/util");
const moduleTypes_1 = require("../moduleTypes");
const StoredPlaybackManager_1 = require("../RunManager/StoredRun/StoredPlaybackManager");
const log = logging_1.logger("ClientAgent");
//TODO: SEPARATE STATE TRANSMISSION CHANNELS
class ClientAgent {
    constructor(io, rm) {
        this._activeRun = null;
        this._activePlay = null;
        util_1.bindThis(ClientAgent, this);
        log("new connection - clientAgent");
        this._io = io;
        this._runManager = rm.on("runChange", this.handleRunsUpdate);
        io.on("disconnect", () => console.log("DISCON"));
        this.initPlayChannels();
        this.initRunChannels();
        this.initSchemaChannels();
        this.emitCompleteState();
        //Emit runs at interval to update size on client.
        setInterval(this.emitRuns, 1000); //Poll runs at 1s
    }
    initSchemaChannels() {
        this._io.on("create_module", this.wh((typeName) => this.activeRun().schemaManager().createNewModuleDefinition(typeName)));
        this._io.on("schema_update", this.wh((schema) => this.activeRun().schemaManager().load(schema)));
    }
    initRunChannels() {
        this._io.on(SIOChannels_1.CHANNELS.RUN_INIT_REQUEST, this.wh((uuid) => this.runManager().beginRunStorage(uuid)));
        this._io.on(SIOChannels_1.CHANNELS.RUN_STOP_REQUEST, this.wh((uuid) => this.runManager().stopRunStorage(uuid)));
        this._io.on(SIOChannels_1.CHANNELS.RUN_DELETE_REQUEST, this.wh((uuid) => {
            log(`DELETING ${uuid}`);
            this.runManager().deleteStoredRun(uuid);
        }));
        this._io.on("set_run_meta", this.wh((uuid, meta) => this.runManager().resolveRun(uuid).metaManager().set(meta)));
        this._io.on(SIOChannels_1.CHANNELS.ACTIVATE_RUN, this.wh(this.activateRun));
        this._io.on(SIOChannels_1.CHANNELS.DEACTIVATE_RUN, this.wh(this.deactivateRun));
    }
    initPlayChannels() {
        this._io.on(SIOChannels_1.CHANNELS.PLAY_START, this.wh(() => this.activePlay().play()));
        this._io.on(SIOChannels_1.CHANNELS.PLAY_STOP, this.wh(() => this.activePlay().stop()));
        this._io.on(SIOChannels_1.CHANNELS.PLAY_PAUSE, this.wh(() => this.activePlay().pause()));
        this._io.on(SIOChannels_1.CHANNELS.PLAY_FRAMERATE, this.wh((framerate) => this.activePlay().setFramerate(framerate)));
        this._io.on("play_seek", this.wh((time) => {
            if (this._activePlay instanceof StoredPlaybackManager_1.StoredPlaybackManager)
                this._activePlay.seekTo(time);
            else
                throw new Error("Can't seek a realtime run!");
        }));
    }
    emitSchema(schema) {
        if (!schema)
            schema = this._activeRun?.schemaManager().schema();
        this._io.emit(SIOChannels_1.CHANNELS.SCHEMA, schema);
    }
    emitRuns() {
        this._io.emit(SIOChannels_1.CHANNELS.RUNS, this._runManager.runs());
    }
    emitPlayState(play) {
        this._io.emit(SIOChannels_1.CHANNELS.PLAY_STATE, play?.state() ?? this._activePlay?.state() ?? undefined);
    }
    emitActiveRun() {
        this._io.emit("active_run", this._activeRun?.uuid() ?? null);
    }
    emitData(data) {
        this._io.emit("data", data);
    }
    emitStatic() {
        this._io.emit(SIOChannels_1.CHANNELS.CAPABILITIES, this._runManager.capabilities());
        this._io.emit("module_types", moduleTypes_1.moduleTypeDefinitions.map(v => v.typeName));
    }
    emitCompleteState() {
        this.emitActiveRun();
        this.emitSchema();
        this.emitPlayState();
        this.emitRuns();
    }
    /**
     * Wrap-Handler. Wraps each handler with a bind and error handler.
     * @private
     */
    wh(handler) {
        const self = this;
        const handlerWrapper = (...args) => {
            try {
                handler.bind(this)(...args);
            }
            catch (e) {
                console.error(e);
                this.emitError(e.message);
                this.emitCompleteState();
            }
        };
        return handlerWrapper.bind(this);
    }
    activateRun(uuid) {
        if (this._activeRun)
            this.deactivateRun(false);
        this._activeRun = this._runManager.resolveRun(uuid)
            .on("destroyed", this.deactivateRun);
        this._activePlay = this._activeRun.getPlayManager(true)
            .on("stateChanged", this.emitPlayState)
            .setFramerate(30)
            .callback(this.emitData);
        this._activeRun.schemaManager()
            .on("load", this.emitSchema)
            .on("update", this.emitSchema);
        this.emitCompleteState();
    }
    deactivateRun(emit = true) {
        this.activeRun()
            .off("destroyed", this.deactivateRun);
        this.activePlay()
            .off("stateChanged", this.emitPlayState)
            .destroy();
        this.activeRun().schemaManager()
            .off("load", this.emitSchema)
            .off("update", this.emitSchema);
        this._activeRun = null;
        this._activePlay = null;
        if (emit)
            this.emitCompleteState();
    }
    handleRunsUpdate() {
        if (this._activeRun && !this._runManager.getRunByUUID(this._activeRun.uuid()))
            this.deactivateRun();
        else
            this.emitRuns();
    }
    activeRun() {
        if (!this._activeRun)
            throw new Error("Error: no active run!");
        return this._activeRun;
    }
    activePlay() {
        if (!this._activePlay)
            throw new Error("Error: No active play!");
        return this._activePlay;
    }
    runManager() {
        return this._runManager;
    }
    emitError(errorMessage) {
        log(`emitting error: ${errorMessage}`, "error");
        this._io.emit(SIOChannels_1.CHANNELS.GENERAL_ERROR, errorMessage);
    }
}
exports.ClientAgent = ClientAgent;
//# sourceMappingURL=ClientAgent.js.map
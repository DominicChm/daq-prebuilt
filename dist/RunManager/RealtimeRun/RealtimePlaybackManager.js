"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealtimePlaybackManager = void 0;
const PlaybackManager_1 = require("../PlaybackManager");
const util_1 = require("../../Util/util");
class RealtimePlaybackManager extends PlaybackManager_1.PlaybackManager {
    constructor(run, convertData) {
        super("realtime", convertData);
        util_1.bindThis(RealtimePlaybackManager, this);
        this._run = run;
        this._run.on("destroyed", this.destroy);
    }
    destroy() {
        this.stop();
        this._run.off("destroyed", this.destroy);
        return this;
    }
    setScale(scale) {
        throw new Error("Can't scale a realtime run");
    }
    setFramerate(rate) {
        return super.setFramerate(rate);
    }
    play() {
        this._state.time = 0;
        this._run.getDataStream(0, this.convertingEnabled()).on("data", this.runCB.bind(this));
        return super.play();
    }
    stop() {
        return super.stop();
    }
    pause() {
        return this.stop();
    }
    createPlayStream() {
        throw new Error("Method not implemented.");
    }
}
exports.RealtimePlaybackManager = RealtimePlaybackManager;
//# sourceMappingURL=RealtimePlaybackManager.js.map
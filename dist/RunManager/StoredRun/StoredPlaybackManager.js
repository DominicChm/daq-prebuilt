"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoredPlaybackManager = void 0;
const PlaybackManager_1 = require("../PlaybackManager");
const util_1 = require("../../Util/util");
const StreamUtils_1 = require("../../StreamUtils");
const PipeChunks_1 = require("../../StreamUtils/PipeChunks");
const Throttle_1 = require("../../Util/Throttle");
class StoredPlaybackManager extends PlaybackManager_1.PlaybackManager {
    constructor(run, convertData) {
        super("stored", convertData);
        util_1.bindThis(StoredPlaybackManager, this);
        this._run = run;
        this._run.on("destroyed", this.destroy);
        this._seekThrottle = new Throttle_1.Throttle(this._execSeek, 100);
    }
    destroy() {
        this.stop();
        this._run.off("destroyed", this.destroy);
        return this;
    }
    setScale(scale) {
        return super.setScale(scale);
    }
    setFramerate(rate) {
        return super.setFramerate(rate);
    }
    //Seeks to a point in the run. Time should be in ms.
    seekTo(time) {
        let frameInterval = this._run.schemaManager().frameInterval();
        if (time == null || frameInterval == null)
            return this;
        this._state.time = time;
        this._seekThrottle.call();
        return this;
    }
    _execSeek() {
        try {
            this.stop();
            this.setFrameLimit(1);
            this.play();
        }
        catch (e) {
            console.error(e);
        }
    }
    createStreamChunks() {
        if (this._stream)
            this.stop();
        if (this._run.size() <= this.position())
            throw new Error("Attempt to start oversize file stream");
        return {
            readStream: this._run.getDataStream(this.time(), this.convertingEnabled()),
            temporalStream: new StreamUtils_1.TemporalStream(this._run.schemaManager().frameInterval() * this._state.scale),
            counter: new StreamUtils_1.ChunkCounter(this.time(), this._run.schemaManager().frameInterval(), "time"),
            limiter: new StreamUtils_1.FramerateLimiter(1000 / this._state.framerate)
        };
    }
    pause() {
        if (!this._stream || !this._streamChunks.temporalStream)
            throw new Error("Can't play - Playback is stopped!");
        this._streamChunks.temporalStream.pauseStream();
        console.log("PAUSE");
        return super.pause();
    }
    play() {
        if (this._stream) //Handle an un-pause.
            this._streamChunks.temporalStream.resumeStream();
        else {
            this._streamChunks = {
                ...this.createStreamChunks(),
                target: new StreamUtils_1.EventStreamConsumer()
                    .on("data", this.runCB)
                    //.on("data", console.log)
                    .on("drain", this.stop)
                    .on("close", this.stop)
                    .on("finish", this.stop)
            };
            this._stream = PipeChunks_1.pipeChunks(this._streamChunks);
        }
        return super.play();
    }
    position() {
        let frameInterval = this._run.schemaManager().frameInterval();
        if (frameInterval == null)
            throw new Error("Schema frameinterval is null.");
        return Math.floor(this.time() / frameInterval) * this._run.schemaManager().storedCType().size;
    }
    stop() {
        this._stream?.destroy();
        this._stream = null;
        this._streamChunks = null;
        return super.stop();
    }
}
exports.StoredPlaybackManager = StoredPlaybackManager;
//# sourceMappingURL=StoredPlaybackManager.js.map
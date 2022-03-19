"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaybackManager = void 0;
const tiny_typed_emitter_1 = require("tiny-typed-emitter");
const on_change_1 = __importDefault(require("on-change"));
const util_1 = require("../Util/util");
class PlaybackManager extends tiny_typed_emitter_1.TypedEmitter {
    constructor(playType, convertingEnabled) {
        super();
        this._frameLimit = 0; // Number of frames to play. 0 = disabled.
        util_1.bindThis(PlaybackManager, this);
        this._callback = () => {
        };
        this._state = on_change_1.default({
            time: 0,
            playing: false,
            paused: false,
            scale: 1,
            framerate: 10,
            playType
        }, this.onStateChange.bind(this));
        this._convertingEnabled = convertingEnabled;
    }
    convertingEnabled() {
        return this._convertingEnabled;
    }
    onStateChange() {
        this.emit("stateChanged", this);
    }
    pause() {
        this._state.paused = true;
        this._state.playing = false;
        return this;
    }
    play() {
        this._state.playing = true;
        this._state.paused = false;
        return this;
    }
    callback(cb) {
        this._callback = cb;
        return this;
    }
    stop() {
        this._state.playing = false;
        this._state.paused = false;
        this.setFrameLimit(0);
        return this;
    }
    ;
    setFramerate(rate) {
        if (rate != null)
            this._state.framerate = rate;
        return this;
    }
    ;
    setScale(scale) {
        if (scale != null)
            this._state.scale = scale;
        return this;
    }
    ;
    setFrameLimit(frames) {
        this._frameLimit = frames;
    }
    state() {
        return this._state;
    }
    time() {
        return this._state.time;
    }
    /**
     * Should be fed frames at a constant interval. Limits frame emission to a
     * set framerate so that readers aren't overwhelmed. Doesn't control
     * speed of playback.
     */
    runCB(data) {
        if (!this.state().playing)
            return;
        this._state.time = data.time;
        this._callback(data);
        if (this._frameLimit > 0 && this._frameLimit-- === 1)
            this.pause();
    }
    allFrames() {
        return this.setFramerate(0);
    }
    noMeter() {
        return this.setScale(0);
    }
}
exports.PlaybackManager = PlaybackManager;
//# sourceMappingURL=PlaybackManager.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamPauser = void 0;
const stream_1 = require("stream");
// Limits the speed of the piped stream to the passed interval.
// All chunks will eventually be emitted, at a rate of one every interval milliseconds.
class StreamPauser extends stream_1.Transform {
    constructor() {
        super({ objectMode: true });
        this._pausedCallback = null;
    }
    pauseStream() {
        // this._pausedCallback ||= true;
        this.cork();
        this.pause();
    }
    resumeStream() {
        // if (this._pausedCallback)
        //     this._pausedCallback();
        //
        // this._pausedCallback = null;
        this.uncork();
        this.resume();
    }
    _transform(chunk, encoding, callback) {
        // if (this._pausedCallback)
        //     this._pausedCallback = () => callback(null, chunk);
        // else
        callback(null, chunk);
    }
}
exports.StreamPauser = StreamPauser;
//# sourceMappingURL=StreamPauser.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemporalStream = void 0;
const stream_1 = require("stream");
// Limits the speed of the piped stream to the passed interval.
// All chunks will eventually be emitted, at a rate of one every interval milliseconds.
class TemporalStream extends stream_1.Transform {
    constructor(interval) {
        super({ objectMode: true });
        this._interval = 1000;
        if (interval != null)
            this._interval = interval;
    }
    setInterval(interval) {
        this._interval = interval;
    }
    _transform(chunk, encoding, callback) {
        this.push(chunk);
        if (this._interval > 0)
            setTimeout(callback, this._interval);
        else
            callback();
    }
    pauseStream() {
        this.cork();
        this.pause();
    }
    resumeStream() {
        this.uncork();
        this.resume();
    }
}
exports.TemporalStream = TemporalStream;
//# sourceMappingURL=TemporalStream.js.map
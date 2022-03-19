"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FramerateLimiter = void 0;
const stream_1 = require("stream");
const nodata = Symbol("nodata");
// Limits the time between emitted chunks. Emits a chunk every interval ms, skipping chunks that come in during the cool-down.
// Always eventually emits the last chunk passed in.
class FramerateLimiter extends stream_1.Transform {
    constructor(interval) {
        super({ objectMode: true });
        this.bufferedChunk = nodata;
        this.timeoutHandle = null;
        this.handleTimeout = this.handleTimeout.bind(this);
        this._interval = interval ?? 1000;
    }
    _transform(chunk, encoding, callback) {
        if (this._interval > 0) {
            this.bufferedChunk = chunk;
            this.timeoutHandle || (this.timeoutHandle = setTimeout(this.handleTimeout, this._interval));
        }
        else
            this.push(chunk);
        callback();
    }
    handleTimeout() {
        this.timeoutHandle = null;
        if (this.bufferedChunk === nodata)
            return;
        this.push(this.bufferedChunk);
        this.bufferedChunk = nodata;
        //Re-set the timeout here to keep timing roughly consistent. If no new data comes in, the next run won't
        this.timeoutHandle = setTimeout(this.handleTimeout, this._interval);
    }
    setInterval(interval) {
        this._interval = interval;
    }
    interval() {
        return this._interval;
    }
    _flush(callback) {
        clearTimeout(this.timeoutHandle);
        callback(null, this.bufferedChunk === nodata ? null : this.bufferedChunk);
        this.bufferedChunk = nodata;
        this.timeoutHandle = null;
    }
}
exports.FramerateLimiter = FramerateLimiter;
//# sourceMappingURL=FramerateLimiter.js.map
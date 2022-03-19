"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChunkLimiter = void 0;
const stream_1 = require("stream");
// Limits the amount of chunks that can pass through this stream.
// Corks once the limit is reached.
// 0 disables limiting.
class ChunkLimiter extends stream_1.Transform {
    constructor(limit) {
        super({ objectMode: true });
        this._limit = 0;
        this._counted = 0;
        this._limit = limit;
    }
    _transform(chunk, encoding, callback) {
        this.push(chunk);
        this._counted++;
        console.log(this._counted, this._limit);
        callback();
    }
    reset() {
        this._counted = 0;
        this.uncork();
        this.emit("uncorked");
        return this;
    }
    setLimit(limit, reset = true) {
        this._limit = limit;
        if (reset)
            this.reset();
        return this;
    }
}
exports.ChunkLimiter = ChunkLimiter;
//# sourceMappingURL=ChunkLimiter.js.map
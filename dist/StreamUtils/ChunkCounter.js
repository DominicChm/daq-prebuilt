"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChunkCounter = void 0;
const stream_1 = require("stream");
// Injects a count into the stream object.
class ChunkCounter extends stream_1.Transform {
    constructor(startValue, valuePerChunk, key) {
        super({ objectMode: true });
        this._value = startValue;
        this._valuePerChunk = valuePerChunk;
        this._key = key;
    }
    _transform(chunk, encoding, callback) {
        if (typeof chunk !== "object")
            throw new Error("Time injector only works on object streams!");
        chunk[this._key] = this._value;
        this._value += this._valuePerChunk;
        callback(null, chunk);
    }
    key() {
        return this._key;
    }
}
exports.ChunkCounter = ChunkCounter;
//# sourceMappingURL=ChunkCounter.js.map
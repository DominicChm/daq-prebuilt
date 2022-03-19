"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataConverterStream = void 0;
const stream_1 = require("stream");
class DataConverterStream extends stream_1.Transform {
    constructor(manager) {
        super({ objectMode: true });
        this._instanceManager = manager;
    }
    _transform(chunk, encoding, callback) {
        callback(null, this._instanceManager.raw2human(chunk));
    }
}
exports.DataConverterStream = DataConverterStream;
//# sourceMappingURL=DataConverterStream.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketEmitter = void 0;
const stream_1 = require("stream");
class SocketEmitter extends stream_1.Writable {
    constructor() {
        super({ objectMode: true });
    }
    _write(chunk, encoding, callback) {
        this.emit("data", chunk);
        callback();
    }
}
exports.SocketEmitter = SocketEmitter;
//# sourceMappingURL=SocketEmitter.js.map
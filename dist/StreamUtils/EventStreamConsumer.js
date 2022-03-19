"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStreamConsumer = void 0;
const stream_1 = require("stream");
class EventStreamConsumer extends stream_1.Writable {
    constructor() {
        super({ objectMode: true });
    }
    _write(chunk, encoding, callback) {
        this.emit("data", chunk);
        callback();
    }
}
exports.EventStreamConsumer = EventStreamConsumer;
//# sourceMappingURL=EventStreamConsumer.js.map
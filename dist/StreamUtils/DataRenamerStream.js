"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataRenamerStream = void 0;
const stream_1 = require("stream");
/**
 * Maps a data stream to use module names rather than UUIDs, as a step in converting to user-readable CSV.
 */
class DataRenamerStream extends stream_1.Transform {
    constructor(schemaManager) {
        super({ objectMode: true });
        this._map = new Map();
        this._map.set("time", "time");
        for (const i of schemaManager.instanceManager().instances()) {
            this._map.set(i.id(), i.name());
        }
    }
    _transform(chunk, encoding, callback) {
        const newObj = {};
        for (const [uuid, name] of this._map) {
            newObj[name] = chunk[uuid];
        }
        callback(null, newObj);
    }
}
exports.DataRenamerStream = DataRenamerStream;
//# sourceMappingURL=DataRenamerStream.js.map
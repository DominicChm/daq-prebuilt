"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CTypeStream = void 0;
const stream_1 = require("stream");
class CTypeStream extends stream_1.Transform {
    constructor(ctype) {
        super({ objectMode: true, defaultEncoding: "binary" });
        this.leftovers = Buffer.alloc(0);
        this._ctype = ctype;
    }
    _transform(chunk, encoding, callback) {
        //console.log(chunk);
        chunk = Buffer.concat([this.leftovers, chunk]);
        while (chunk.length > this._ctype.size) {
            this.push(this._ctype.readLE(chunk.buffer, chunk.byteOffset));
            chunk = chunk.slice(this._ctype.size);
        }
        this.leftovers = chunk;
        callback();
    }
}
exports.CTypeStream = CTypeStream;
//# sourceMappingURL=CTypeStream.js.map
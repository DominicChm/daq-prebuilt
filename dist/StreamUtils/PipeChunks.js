"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipeChunks = void 0;
function pipeChunks(chunks) {
    let stream = null;
    for (const v of Object.values(chunks)) {
        if (stream)
            stream = stream.pipe(v);
        else
            stream = v;
    }
    return stream;
}
exports.pipeChunks = pipeChunks;
//# sourceMappingURL=PipeChunks.js.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSVEncoderStream = void 0;
const stream_1 = require("stream");
const Papa = __importStar(require("papaparse"));
const flattenObject = (obj, prefix = '') => Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (typeof obj[k] === 'object')
        Object.assign(acc, flattenObject(obj[k], pre + k));
    else
        acc[pre + k] = obj[k];
    return acc;
}, {});
class CSVEncoderStream extends stream_1.Transform {
    constructor(frameInterval) {
        super({ objectMode: true });
        this._time = 0;
        this._headerWritten = false;
        this._frameInterval = frameInterval;
    }
    _transform(chunk, encoding, callback) {
        if (this._frameInterval) {
            chunk.time = this._time;
            this._time += this._frameInterval;
        }
        const flat = flattenObject(chunk);
        const dat = Papa.unparse([flat], { header: !this._headerWritten }) + "\n";
        this._headerWritten = true;
        callback(null, dat);
    }
}
exports.CSVEncoderStream = CSVEncoderStream;
//# sourceMappingURL=CSVEncoderStream.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeSyncServer = void 0;
const worker_threads_1 = require("worker_threads");
const path_1 = __importDefault(require("path"));
class TimeSyncServer {
    constructor() {
        this._worker = new worker_threads_1.Worker(path_1.default.resolve(__dirname, "./worker.js"));
    }
}
exports.TimeSyncServer = TimeSyncServer;
//# sourceMappingURL=TimeSyncServer.js.map
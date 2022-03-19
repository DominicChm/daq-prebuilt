"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAQPathManager = exports.PATHS = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = require("fs-extra");
const DAQSchema_1 = require("../SchemaManager/interfaces/DAQSchema");
exports.PATHS = {
    runData: "run-data",
    schema: "realtime-schema.json",
    realtimeMeta: "realtime-meta.json"
};
class DAQPathManager {
    constructor(rootDir) {
        this.rootDir = path_1.default.resolve(rootDir);
        fs_extra_1.ensureDirSync(this.resolve(exports.PATHS.runData));
        if (!fs_extra_1.existsSync(this.resolve(exports.PATHS.schema)))
            fs_extra_1.writeJsonSync(this.resolve(exports.PATHS.schema), DAQSchema_1.defaultDAQSchema);
    }
    resolve(path) {
        return path_1.default.resolve(this.rootDir, path);
    }
    RunDataPath() {
        return this.resolve(exports.PATHS.runData);
    }
    RealtimeSchemaPath() {
        return this.resolve(exports.PATHS.schema);
    }
    RealtimeMetaPath() {
        return this.resolve(exports.PATHS.realtimeMeta);
    }
}
exports.DAQPathManager = DAQPathManager;
//# sourceMappingURL=DAQPathManager.js.map
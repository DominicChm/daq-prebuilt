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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoredRunManager = void 0;
const StoredRun_1 = require("./StoredRun/StoredRun");
const fs_extra_1 = __importDefault(require("fs-extra"));
const Path = __importStar(require("path"));
const tiny_typed_emitter_1 = require("tiny-typed-emitter");
const util_1 = require("../Util/util");
/**
 * Responsible for managing stored runs
 */
class StoredRunManager extends tiny_typed_emitter_1.TypedEmitter {
    constructor(opts) {
        super();
        this.runs = [];
        util_1.bindThis(StoredRunManager, this);
        this._opts = {
            runDataDirectory: Path.resolve(opts.runDataDirectory),
        };
        this.setupRootDir()
            .catch(console.error);
    }
    runDataDir() {
        return this._opts.runDataDirectory;
    }
    getRuns() {
        return this.runs ?? [];
    }
    async readRuns() {
        //Returns read runs.
        if (!fs_extra_1.default.existsSync(this.runDataDir()))
            throw new Error(`Root directory >${this.runDataDir()}< doesn't exist!`);
        const runDirs = await fs_extra_1.default.readdir(this.runDataDir());
        this.runs = runDirs.map(dir => new StoredRun_1.StoredRun(dir, Path.resolve(this.runDataDir(), dir)));
        this.runs.forEach(r => r.metaManager().on("changed", () => this.emit("run_change")));
        return this.runs;
    }
    //Sets up the root directory to be ready for runs.
    async setupRootDir() {
        fs_extra_1.default.ensureDirSync(this.runDataDir());
        //Cleanup any locks that exist from a bad shutdown.
        (await this.readRuns()).forEach(r => r.unlock());
    }
    createStoredRun(uuid) {
        const runFolder = this.resolve(uuid);
        fs_extra_1.default.ensureDirSync(runFolder);
        const run = new StoredRun_1.StoredRun(uuid, runFolder);
        this.runs.push(run);
        return run;
    }
    resolve(path) {
        return Path.resolve(this.runDataDir(), path);
    }
}
exports.StoredRunManager = StoredRunManager;
//# sourceMappingURL=StoredRunManager.js.map
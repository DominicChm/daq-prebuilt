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
exports.FileSchemaManager = void 0;
const SchemaManager_1 = require("./SchemaManager");
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs-extra"));
class FileSchemaManager extends SchemaManager_1.SchemaManager {
    constructor(filePath) {
        super();
        this._filePath = path_1.default.resolve(filePath);
        //Attach listeners to update/load events to write schema.
        this.on("update", this.writeSchema.bind(this));
        this.on("load", this.writeSchema.bind(this));
        const json = fs.readJsonSync(this._filePath, { throws: false }) || { modules: [], name: "NEW_SCHEMA!" };
        this.load(json);
    }
    writeSchema(schema, persistentSchema) {
        fs.outputJSONSync(this._filePath, persistentSchema, { spaces: 2 });
    }
    filePath() {
        return this._filePath;
    }
}
exports.FileSchemaManager = FileSchemaManager;
//# sourceMappingURL=FileSchemaManager.js.map
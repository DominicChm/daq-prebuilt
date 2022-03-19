"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleDefinitionSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const MACUtil_1 = require("../../Util/MACUtil");
const ModuleDefinitionSchema = (opts) => joi_1.default.object({
    id: joi_1.default.string(),
    name: joi_1.default.string()
        .default(opts.defaultName),
    description: joi_1.default.string()
        .allow("")
        .default(""),
    mac: joi_1.default.string()
        .custom(MACUtil_1.joiMac)
        .default("00:00:00:00:00:00"),
    version: joi_1.default.number()
        .integer()
        .default(0),
    type: joi_1.default.string()
        .default(opts.typename),
    config: opts.configSchema
        .prefs({ allowUnknown: true })
        .default(opts.defaultConfig),
});
exports.ModuleDefinitionSchema = ModuleDefinitionSchema;
//# sourceMappingURL=ModuleDefinition.js.map
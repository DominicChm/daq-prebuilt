"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunMetaSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.RunMetaSchema = joi_1.default.object({
    name: joi_1.default.string().default("New Run"),
    description: joi_1.default.string().default("").allow(""),
});
//# sourceMappingURL=RunMeta.js.map
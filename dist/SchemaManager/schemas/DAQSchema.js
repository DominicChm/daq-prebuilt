"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAQSchemaValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.DAQSchemaValidator = joi_1.default.object({
    name: joi_1.default.string(),
    frameInterval: joi_1.default.number().min(10).max(1000),
    modules: joi_1.default.array().items(joi_1.default.object())
});
//# sourceMappingURL=DAQSchema.js.map
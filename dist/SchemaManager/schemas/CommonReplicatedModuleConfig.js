"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonConfigCTypes = exports.CommonReplicatedModuleConfig = void 0;
const joi_1 = __importDefault(require("joi"));
const c_type_util_1 = require("c-type-util");
exports.CommonReplicatedModuleConfig = {
    typeNameHash: joi_1.default.number()
        .integer()
        .default(0),
    globalSampleInterval: joi_1.default.number()
        .integer()
        .default(1000),
};
exports.CommonConfigCTypes = {
    typeNameHash: c_type_util_1.uint32,
};
//# sourceMappingURL=CommonReplicatedModuleConfig.js.map
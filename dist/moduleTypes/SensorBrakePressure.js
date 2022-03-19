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
exports.SensorBrakePressure = void 0;
const joi_1 = __importDefault(require("joi"));
const ctypes = __importStar(require("c-type-util"));
exports.SensorBrakePressure = {
    typeName: "brake_pressure",
    // Config
    // Persistent config is stored and loaded from disk between restarts.
    // Replicated config is what is sent to the remote module, and has a corresponding serializer (ctype).
    // Persistent and replicated config do NOT need to be the same - this is desirable.
    // Identical keys between config types are merged (treated as same)
    // Persistent config takes priority over replicated!!!!
    persistentConfigSchema: {
        minVoltage: joi_1.default.number().default(0),
        psiPerVolt: joi_1.default.number().default(0),
    },
    replicatedConfigSchema: {
        replicated: joi_1.default.number().default(123),
    },
    // Raw describes the binary data coming in from the module.
    // Storage describes the data being stored to/from disk.
    // Storage should be a sub-type of Raw, such that some raw values might not be stored.
    rawCType: {
        analog: ctypes.uint16
    },
    storageCType: {
        analog: ctypes.uint16
    },
    replicatedConfigCType: {
        replicated: ctypes.uint16
    },
    raw2Human(raw, config, stored2Human) {
        return stored2Human(raw, config);
    },
    stored2Human(raw, config) {
        return {
            psi: raw.analog * config.psiPerVolt + config.minVoltage
        };
    }
};
//# sourceMappingURL=SensorBrakePressure.js.map
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
exports.logger = void 0;
const winston = __importStar(require("winston"));
const chalk_1 = __importDefault(require("chalk"));
let labelLen = 0; //Used to align log messages.
const loggerLevels = {
    fatal: 0,
    alert: 1,
    error: 2,
    warn: 3,
    info: 4,
    debug: 5,
    net: 6,
    silly: 7,
};
class Random {
    constructor(seed) {
        this.seed = (seed ?? 0) + 69;
    }
    random() {
        const x = Math.sin(this.seed++) * 10000;
        return x - Math.floor(x);
    }
    nextHexColor() {
        return `#${(Math.floor(this.random() * 0xBBBBBB) + 0x444444).toString(16)}`;
    }
}
const hashCode = (s) => s.split('').reduce((a, b) => (((a << 5) - a) + b.charCodeAt(0)) | 0, 0);
const format = winston.format.combine(winston.format(info => {
    info.level = info.level.toUpperCase();
    return info;
})(), winston.format.colorize(), winston.format.printf(({ level, message, label, labelColor }) => {
    const l = labelColor(`[${label}]`); //.padStart(labelLen + 3)
    return `${l} (${level}): ${message}`;
}));
const logging = winston.createLogger({
    transports: [new winston.transports.Console()],
    format: format,
    levels: loggerLevels,
});
function logger(moduleName) {
    const color = `#` + (hashCode(moduleName) & 0xFFFFFF).toString(16).padStart(6, '0');
    labelLen = Math.max(labelLen, moduleName.length);
    return function log(msg, level = "info") {
        logging.log({
            level: level,
            message: msg,
            label: moduleName,
            labelColor: chalk_1.default.hex(color)
        });
    };
}
exports.logger = logger;
//# sourceMappingURL=logging.js.map
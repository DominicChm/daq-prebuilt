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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientManager = void 0;
const ClientAgent_1 = require("./ClientAgent");
const sio = __importStar(require("socket.io"));
/**
 * Sets up and manages the socket.io server.
 */
class ClientManager {
    constructor(runManager, server) {
        this.agents = new WeakSet();
        this.runManager = runManager;
        this.io = new sio.Server(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });
        this.io.on('connection', (socket) => {
            this.agents.add(new ClientAgent_1.ClientAgent(socket, this.runManager));
        });
        // this.runManager.on("runChange", () => {
        //     this.io.emit(CHANNELS.RUNS_LIST, this.runManager.runs())
        // });
    }
}
exports.ClientManager = ClientManager;
//# sourceMappingURL=ClientManager.js.map
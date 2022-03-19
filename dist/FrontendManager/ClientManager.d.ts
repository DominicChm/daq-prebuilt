/// <reference types="node" />
import { RunManager } from "../RunManager/RunManager";
import * as http from "http";
/**
 * Sets up and manages the socket.io server.
 */
export declare class ClientManager {
    private io;
    private agents;
    private runManager;
    constructor(runManager: RunManager, server: http.Server);
}
//# sourceMappingURL=ClientManager.d.ts.map
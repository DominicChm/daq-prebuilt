import { RunManager } from "../RunManager/RunManager";
/**
 * Sets up and manages all frontend connections and routes. Responsible for
 * initializing the ClientManager.
 */
export declare class FrontendManager {
    private readonly _app;
    private readonly _server;
    private readonly _clientManager;
    private readonly _runManager;
    constructor(rm: RunManager);
    private setupRoutes;
    /**
     * Generates and Serves a CSV for the run passed as a query parameter.
     */
    private dlCSV;
}
//# sourceMappingURL=FrontendManager.d.ts.map
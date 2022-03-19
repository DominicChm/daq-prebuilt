import { RunManager } from "../RunManager/RunManager";
import * as sio from "socket.io";
export declare class ClientAgent {
    private _io;
    private _runManager;
    private _activeRun;
    private _activePlay;
    constructor(io: sio.Socket, rm: RunManager);
    private initSchemaChannels;
    private initRunChannels;
    private initPlayChannels;
    private emitSchema;
    private emitRuns;
    private emitPlayState;
    private emitActiveRun;
    private emitData;
    private emitStatic;
    private emitCompleteState;
    /**
     * Wrap-Handler. Wraps each handler with a bind and error handler.
     * @private
     */
    private wh;
    activateRun(uuid: string): void;
    deactivateRun(emit?: boolean): void;
    handleRunsUpdate(): void;
    private activeRun;
    private activePlay;
    runManager(): RunManager;
    emitError(errorMessage: string): void;
}
//# sourceMappingURL=ClientAgent.d.ts.map
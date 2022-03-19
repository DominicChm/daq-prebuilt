import { StoredRun } from "./StoredRun/StoredRun";
import { TypedEmitter } from "tiny-typed-emitter";
interface StoredRunManagerEvents {
    run_change: () => void;
}
interface StoredRunManagerOptions {
    runDataDirectory: string;
}
/**
 * Responsible for managing stored runs
 */
export declare class StoredRunManager extends TypedEmitter<StoredRunManagerEvents> {
    private runs;
    private readonly _opts;
    constructor(opts: StoredRunManagerOptions);
    private runDataDir;
    getRuns(): StoredRun[];
    private readRuns;
    setupRootDir(): Promise<void>;
    createStoredRun(uuid: string): StoredRun;
    private resolve;
}
export {};
//# sourceMappingURL=StoredRunManager.d.ts.map
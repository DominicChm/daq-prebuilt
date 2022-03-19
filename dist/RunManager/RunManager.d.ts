import { RealtimeRun } from "./RealtimeRun/RealtimeRun";
import { ModuleManager } from "../ModuleManager/ModuleManager";
import { StoredRun } from "./StoredRun/StoredRun";
import { StoredRunManager } from "./StoredRunManager";
import { RunHandle } from "./RunHandle";
import { Capabilties } from "./interfaces/capabilties";
import { TypedEmitter } from "tiny-typed-emitter";
export declare type Newable<T> = {
    new (...args: any[]): T;
};
interface RunManagerEvents {
    runChange: (runs: RunHandle[]) => void;
}
/**
 * Manages all components responsible for managing run data.
 * Central component for creating, removing, reading, and storing runs.
 */
export declare class RunManager extends TypedEmitter<RunManagerEvents> {
    private readonly _fileManager;
    private readonly _moduleManager;
    private _runs;
    constructor(fileManager?: StoredRunManager | null, moduleManager?: ModuleManager | null);
    private emitRunsChange;
    /**
     * Helper function to guard methods that need a FileManager to work.
     * @private
     */
    private checkFM;
    /**
     * Returns all held runs. Not cached, so always up-to-date.
     */
    runs(): RunHandle[];
    /**
     * Find a run which is an instance of the passed run type, or any. Returns undefined if not found.
     * @param uuid - The UUID of the run to attempt to find
     * @param runType - The class to filter findable runs by (Realtime or Stored)
     */
    getRunByUUID<T extends RunHandle>(uuid: string, runType?: Newable<T>): T | undefined;
    /**
     * Resolves either a run or string to a valid run. If one isn't found, this method throws.
     * @param run - A Run or run UUID
     * @param runType - Optional - the type of run to resolve.
     */
    resolveRun<T extends RunHandle>(run: string | T, runType?: Newable<T>): T;
    /**
     * Initializes the storage of a RealtimeRun into a StoredRun.
     * @param run
     */
    beginRunStorage(run: string | RealtimeRun): void;
    /**
     * Unlinks a StoredRun from a RealtimeRun.
     * @param run - A run or UUID to stop
     */
    stopRunStorage(run: string | StoredRun): void;
    /**
     * What the name says - deletes a stored run. This action cannot be undone.
     * @param run - A run or UUID to delete
     */
    deleteStoredRun(run: string | StoredRun): void;
    fileManager(): StoredRunManager;
    moduleManager(): ModuleManager;
    /**
     * Returns a simple object describing what capabilities this RunManager has, depending on what modules have been
     * loaded.
     */
    capabilities(): Capabilties;
}
export {};
//# sourceMappingURL=RunManager.d.ts.map
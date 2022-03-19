import { PlaybackManager } from "../PlaybackManager";
import { RealtimeRun } from "./RealtimeRun";
export declare class RealtimePlaybackManager extends PlaybackManager {
    private _run;
    constructor(run: RealtimeRun, convertData: boolean);
    destroy(): this;
    setScale(scale?: number): this;
    setFramerate(rate?: number): this;
    play(): this;
    stop(): this;
    pause(): this;
    createPlayStream(): void;
}
//# sourceMappingURL=RealtimePlaybackManager.d.ts.map
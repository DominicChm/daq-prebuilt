import { TypedEmitter } from "tiny-typed-emitter";
import { PlaybackManagerEvents } from "./interfaces/PlayManagerEvents";
import { PlaybackManagerState } from "./interfaces/PlayManagerState";
export declare abstract class PlaybackManager extends TypedEmitter<PlaybackManagerEvents> {
    private readonly _convertingEnabled;
    protected _state: PlaybackManagerState;
    protected _callback: (frame: any) => void;
    private _frameLimit;
    protected constructor(playType: "realtime" | "stored", convertingEnabled: boolean);
    convertingEnabled(): boolean;
    onStateChange(): void;
    pause(): this;
    play(): this;
    callback(cb: (frame: any) => void): this;
    stop(): this;
    setFramerate(rate?: number): this;
    setScale(scale?: number): this;
    setFrameLimit(frames: number): void;
    abstract destroy(): this;
    state(): PlaybackManagerState;
    time(): number;
    /**
     * Should be fed frames at a constant interval. Limits frame emission to a
     * set framerate so that readers aren't overwhelmed. Doesn't control
     * speed of playback.
     */
    protected runCB(data: any): void;
    allFrames(): this;
    noMeter(): this;
}
//# sourceMappingURL=PlaybackManager.d.ts.map
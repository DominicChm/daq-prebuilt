export declare class Throttle {
    private readonly _fn;
    private _lastArg;
    private _callTimeout;
    private _interval;
    constructor(fn: Function, interval: number);
    call(...args: any[]): void;
    private _execCall;
}
//# sourceMappingURL=Throttle.d.ts.map
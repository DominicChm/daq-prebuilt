"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Throttle = void 0;
const util_1 = require("./util");
const nil = Symbol("nil");
class Throttle {
    constructor(fn, interval) {
        this._lastArg = nil;
        this._callTimeout = null;
        this._interval = 100;
        util_1.bindThis(Throttle, this);
        this._fn = fn;
        this._interval = interval;
    }
    call(...args) {
        if (!this._callTimeout)
            this._fn(...args);
        else
            this._lastArg = args;
        this._callTimeout || (this._callTimeout = setTimeout(this._execCall, this._interval));
    }
    _execCall() {
        if (this._lastArg === nil) {
            this._callTimeout = null;
            return;
        }
        this._fn(...this._lastArg);
        this._lastArg = nil;
        clearTimeout(this._callTimeout);
        this._callTimeout = setTimeout(this._execCall, this._interval);
    }
}
exports.Throttle = Throttle;
//# sourceMappingURL=Throttle.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealtimeRun = void 0;
const RunHandle_1 = require("../RunHandle");
const RealtimePlaybackManager_1 = require("./RealtimePlaybackManager");
const stream_1 = require("stream");
const StreamUtils_1 = require("../../StreamUtils");
const lodash_1 = require("lodash");
/**
 * Describes a run that's happening "right now". Used for streaming data from modules in real-time.
 */
class RealtimeRun extends RunHandle_1.RunHandle {
    constructor(uuid, schemaPath, metaPath) {
        super("realtime", uuid, schemaPath, metaPath, true);
        this._rootConvertedStream = new StreamUtils_1.DataConverterStream(this.schemaManager().instanceManager());
    }
    //Raw JSON data
    feedData(data) {
        this.emit("data", data);
        this.emit("dataConverted", this.schemaManager().instanceManager().raw2human(data));
    }
    getPlayManager(convertData) {
        return new RealtimePlaybackManager_1.RealtimePlaybackManager(this, convertData);
    }
    getDataStream(time, convert) {
        const s = new stream_1.Readable({ read: lodash_1.noop, objectMode: true });
        if (convert)
            this.on("dataConverted", s.push.bind(s));
        else
            this.on("data", s.push.bind(s));
        this.on("destroyed", s.destroy.bind(s));
        return s;
    }
}
exports.RealtimeRun = RealtimeRun;
//# sourceMappingURL=RealtimeRun.js.map
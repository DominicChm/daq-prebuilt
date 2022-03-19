"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mqtt_1 = __importDefault(require("mqtt"));
const logging_1 = require("../Util/logging");
const log = logging_1.logger("TimeSync");
function time() {
    const t = process.hrtime();
    return (t[0] * 1000 + t[1] / 1e6) | 0;
}
const client = mqtt_1.default.connect("mqtt://localhost:1883");
client.on("connect", () => {
    log("MQTT Connected!");
    client.subscribe("car/+/time");
});
//On reception of a message, publish the current time to the incoming time topic.
const debouncedTopics = new Set();
client.on('message', function (topic, message) {
    if (debouncedTopics.has(topic)) {
        debouncedTopics.delete(topic);
        return;
    }
    log(`SYNC: ${topic}`);
    debouncedTopics.add(topic);
    client.publish(topic, time().toString());
});
//# sourceMappingURL=TimeSyncWorker.js.map
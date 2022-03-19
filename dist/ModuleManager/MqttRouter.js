"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttRouter = void 0;
const events_1 = __importDefault(require("events"));
const logging_1 = require("../Util/logging");
const log = logging_1.logger("MqttRouter");
/**
 * Routes MQTT messages such that individual topics are subscribable.
 * TODO: Wrap other eventemitter methods (off - need to unsub)
 */
class MqttRouter extends events_1.default {
    constructor(mqtt) {
        super();
        this._mqtt = mqtt;
        this._mqtt.on("message", this.onMqttMessage.bind(this));
    }
    /**
     * Subscribe to events from the passed MQTT channel.
     * @param channel - The MQTT Channel to subscribe to.
     * @param listener
     */
    on(channel, listener) {
        log(`Subscribing >${channel}<`);
        // If the channel hasn't been subbed to yet, do it so we start receiving its events.
        if (!this.eventNames().includes(channel))
            this._mqtt.subscribe(channel);
        super.on(channel, listener);
        return this;
    }
    publish(topic, message, opts, callback) {
        this._mqtt.publish(topic, message, opts ?? {}, callback);
        return this;
    }
    onMqttMessage(topic, payload, packet) {
        this.emit(topic, payload, packet);
    }
}
exports.MqttRouter = MqttRouter;
//# sourceMappingURL=MqttRouter.js.map
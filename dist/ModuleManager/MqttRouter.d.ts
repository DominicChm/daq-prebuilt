/// <reference types="node" />
import { MqttClient } from "mqtt";
import EventEmitter from "events";
import { IClientPublishOptions } from "mqtt/types/lib/client-options";
import { PacketCallback } from "mqtt/types/lib/client";
/**
 * Routes MQTT messages such that individual topics are subscribable.
 * TODO: Wrap other eventemitter methods (off - need to unsub)
 */
export declare class MqttRouter extends EventEmitter {
    private readonly _mqtt;
    constructor(mqtt: MqttClient);
    /**
     * Subscribe to events from the passed MQTT channel.
     * @param channel - The MQTT Channel to subscribe to.
     * @param listener
     */
    on(channel: string, listener: (...args: any[]) => void): this;
    publish(topic: string, message: string | Buffer, opts?: IClientPublishOptions, callback?: PacketCallback): this;
    private onMqttMessage;
}
//# sourceMappingURL=MqttRouter.d.ts.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleManager = void 0;
const RealtimeRun_1 = require("../RunManager/RealtimeRun/RealtimeRun");
const uuid_1 = require("uuid");
const mqtt_1 = require("mqtt");
const MqttRouter_1 = require("./MqttRouter");
const tiny_typed_emitter_1 = require("tiny-typed-emitter");
const logging_1 = require("../Util/logging");
const InstanceBinding_1 = require("./InstanceBinding");
const nanotimer_1 = __importDefault(require("nanotimer"));
const c_type_util_1 = require("c-type-util");
const log = logging_1.logger("ModuleManager");
const globalConfig = c_type_util_1.cStruct({
    sampleInterval: c_type_util_1.uint32,
});
/**
 * Facilitates interactions with remote modules. Sets up and tears down MQTT and provides a RealtimeRun
 * to stream data from modules.
 */
class ModuleManager extends tiny_typed_emitter_1.TypedEmitter {
    constructor(opts) {
        super();
        this._bindings = new Map();
        //TODO: REPLACE THIS SINGLE DISPATCHED DATA OBJECT WITH A REAL TIME-BASED
        // AGGREGATOR - THIS IS A "GET IT DONE" STRATEGY!!!
        this._data = {};
        this.dispatchData = this.dispatchData.bind(this);
        this.gatherData = this.gatherData.bind(this);
        this._opts = opts;
        this._mqtt = mqtt_1.connect(opts.mqttUrl);
        this._mqtt.on("connect", () => log("MQTT Connected!"));
        this._mqtt.on("error", (e) => log(`MQTT ERROR! >${e.message}<`));
        this._router = new MqttRouter_1.MqttRouter(this._mqtt);
        this._run = new RealtimeRun_1.RealtimeRun(uuid_1.v4(), opts.schemaPath, opts.realtimeMetaPath);
        this._run.schemaManager().instanceManager().on("bindInstance", this.bindInstance.bind(this));
        this._run.schemaManager().instanceManager().on("unbindInstance", this.unbindInstance.bind(this));
        this._run.schemaManager().instanceManager().on("rebindInstance", this.rebindInstance.bind(this));
        this._run.schemaManager().on("formatBroken", this.onFormatBroken.bind(this));
        this._run.schemaManager().initLoadListener(this.initInstances.bind(this));
        this._frameTimer = new nanotimer_1.default();
        this._frameTimer.setInterval(this.dispatchData.bind(this), '', `${this._run.schemaManager().frameInterval()}m`);
        this._router.publish("car/global", Buffer.from(globalConfig.allocLE({ sampleInterval: this._run.schemaManager().frameInterval() })), { retain: true });
    }
    /**
     * Updates the framerate timer when the DAQ schema has a breaking change (possibly framerate).
     */
    onFormatBroken() {
        this._frameTimer.clearInterval();
        this._frameTimer.setInterval(this.dispatchData.bind(this), '', `${this._run.schemaManager().frameInterval()}m`);
        this._router.publish("car/global", Buffer.from(globalConfig.allocLE({ sampleInterval: this._run.schemaManager().frameInterval() })), { retain: true });
    }
    schemaManager() {
        return this._run.schemaManager();
    }
    initInstances(schema, instances) {
        instances.forEach(this.bindInstance.bind(this));
    }
    bindInstance(instance) {
        this._bindings.set(instance.id(), new InstanceBinding_1.InstanceBinding(instance, this._router, this.gatherData));
        this._data = this.schemaManager()?.storedCType().readLE(new Uint8Array(1000).buffer);
    }
    rebindInstance(instance) {
        this.unbindInstance(instance);
        this.bindInstance(instance);
    }
    /**
     * Ingests parsed, JSON data from modules.
     */
    gatherData(data, time, instance, binding) {
        //console.log(data, this._data);
        //log(data);
        this._data[instance.id()] = data;
    }
    // TODO: REPLACE THIS GARBAGE! TIMING WILL N O T BE ACCURATE WITH THIS APPROACH.
    //  DATA IS SUSCEPTIBLE TO UP TO 500ms DELAYS BC OF WIFI INTERFERENCE!
    dispatchData() {
        this._run?.feedData(this._data);
    }
    unbindInstance(instance) {
        this._bindings.get(instance.id())?.unbind();
        this._bindings.delete(instance.id());
    }
    getRuns() {
        if (this._run)
            return [this._run];
        return [];
    }
}
exports.ModuleManager = ModuleManager;
//# sourceMappingURL=ModuleManager.js.map
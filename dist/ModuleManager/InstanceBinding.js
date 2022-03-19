"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstanceBinding = void 0;
/**
 * Helper class to manage module instance bindings.
 */
class InstanceBinding {
    constructor(instance, router, dataListener) {
        this.unbind = this.unbind.bind(this);
        this.dataListenerWrapper = this.dataListenerWrapper.bind(this);
        this._instance = instance;
        this._router = router;
        this._dataListener = dataListener;
        this._mqttListener = instance.feedRaw;
        this._dataChannel = `car/${instance.mac()}/raw`;
        this._configChannel = `car/${instance.mac()}/config`;
        // TODO: PUBLISH ARRAY OF SUPPORTED MODULE TYPE HASHES HERE.
        this._typeChannel = `car/${instance.mac()}/supported_types`;
        this._router.on(this._dataChannel, this._mqttListener);
        this._instance.on("data", this.dataListenerWrapper);
        this.emitConfig();
    }
    emitConfig() {
        this._router.publish(this._configChannel, Buffer.from(this._instance.replicatedBinConfig()), { retain: true }); //  JSON.stringify(instance.replicatedConfig())
    }
    uuid() {
        return this._instance.id();
    }
    dataListenerWrapper(data, timestamp) {
        this._dataListener(data, timestamp, this._instance, this);
    }
    unbind() {
        this._router.off(this._dataChannel, this._mqttListener);
        this._instance.off("data", this.dataListenerWrapper);
    }
}
exports.InstanceBinding = InstanceBinding;
//# sourceMappingURL=InstanceBinding.js.map
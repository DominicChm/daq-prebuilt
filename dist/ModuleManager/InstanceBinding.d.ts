import { ModuleInstance } from "../SchemaManager/ModuleInstance";
import { MqttRouter } from "./MqttRouter";
export declare type bindingDataListener = (data: any, time: number, id: ModuleInstance, binding: InstanceBinding) => void;
/**
 * Helper class to manage module instance bindings.
 */
export declare class InstanceBinding {
    private readonly _router;
    private readonly _instance;
    private readonly _mqttListener;
    private readonly _dataChannel;
    private readonly _dataListener;
    private _configChannel;
    private _typeChannel;
    constructor(instance: ModuleInstance, router: MqttRouter, dataListener: bindingDataListener);
    emitConfig(): void;
    uuid(): string;
    private dataListenerWrapper;
    unbind(): void;
}
//# sourceMappingURL=InstanceBinding.d.ts.map
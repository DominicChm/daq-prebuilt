/// <reference types="node" />
import { Transform, TransformCallback } from "stream";
import { InstanceManager } from "../SchemaManager/InstanceManager";
export declare class DataConverterStream extends Transform {
    private readonly _instanceManager;
    constructor(manager: InstanceManager);
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void;
}
//# sourceMappingURL=DataConverterStream.d.ts.map
import { IRunMetaSchema } from "./schemas/RunMeta";
import { TypedEmitter } from "tiny-typed-emitter";
interface RunMetaManagerEvents {
    changed: (meta: IRunMetaSchema) => void;
}
export declare class RunMetaManager extends TypedEmitter<RunMetaManagerEvents> {
    private readonly _path;
    private _meta;
    private readonly _readonly;
    constructor(path: string, readonly?: boolean);
    set(meta: IRunMetaSchema): void;
    name(): string;
    meta(): IRunMetaSchema;
}
export {};
//# sourceMappingURL=RunMetaManager.d.ts.map
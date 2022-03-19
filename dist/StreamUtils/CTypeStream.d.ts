/// <reference types="node" />
import { Transform, TransformCallback } from "stream";
import { CType } from "c-type-util";
export declare class CTypeStream extends Transform {
    private leftovers;
    private _ctype;
    constructor(ctype: CType<any>);
    _transform(chunk: Buffer, encoding: BufferEncoding, callback: TransformCallback): void;
}
//# sourceMappingURL=CTypeStream.d.ts.map
import { SchemaManager } from "./SchemaManager";
import { DAQSchema } from "./interfaces/DAQSchema";
export declare class FileSchemaManager extends SchemaManager {
    private readonly _filePath;
    constructor(filePath: string);
    writeSchema(schema: DAQSchema, persistentSchema: DAQSchema): void;
    filePath(): string;
}
//# sourceMappingURL=FileSchemaManager.d.ts.map
import { DAQSchema } from "./DAQSchema";
export interface SchemaManagerEvents {
    load: (schema: DAQSchema, persistentSchema: DAQSchema) => void;
    update: (schema: DAQSchema, persistentSchema: DAQSchema) => void;
    unload: (schema: DAQSchema, persistentSchema: DAQSchema) => void;
    formatBroken: (schema: DAQSchema, persistentSchema: DAQSchema) => void;
}
//# sourceMappingURL=SchemaManagerEvents.d.ts.map
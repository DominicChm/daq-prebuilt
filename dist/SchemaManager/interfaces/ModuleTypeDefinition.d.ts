import { SchemaMap } from "joi";
import { StructMembers } from "c-type-util";
export interface ModuleTypeDefinition {
    typeName: string;
    persistentConfigSchema: SchemaMap;
    replicatedConfigSchema: SchemaMap;
    replicatedConfigCType: StructMembers<any>;
    rawCType: StructMembers<any>;
    storageCType: StructMembers<any>;
    raw2Human: (raw: any, config: any, stored2Human: any) => any;
    stored2Human: (raw: any, config: any) => any;
}
//# sourceMappingURL=ModuleTypeDefinition.d.ts.map
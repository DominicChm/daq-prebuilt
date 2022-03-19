import Joi from "joi";
export interface ModuleDefinitionValidatorOpts {
    typename: string;
    defaultName: string;
    configSchema: any;
    defaultConfig: any;
}
export declare const ModuleDefinitionSchema: (opts: ModuleDefinitionValidatorOpts) => Joi.ObjectSchema<any>;
//# sourceMappingURL=ModuleDefinition.d.ts.map
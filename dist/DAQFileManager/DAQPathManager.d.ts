export declare const PATHS: {
    runData: string;
    schema: string;
    realtimeMeta: string;
};
export declare class DAQPathManager {
    private readonly rootDir;
    constructor(rootDir: string);
    private resolve;
    RunDataPath(): string;
    RealtimeSchemaPath(): string;
    RealtimeMetaPath(): string;
}
//# sourceMappingURL=DAQPathManager.d.ts.map
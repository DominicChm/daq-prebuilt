export declare type log_fn_t = (msg: string, level?: level_keys_t) => void;
declare type level_keys_t = "fatal" | "alert" | "error" | "warn" | "info" | "debug" | "net" | "silly";
export declare function logger(moduleName: string): log_fn_t;
export {};
//# sourceMappingURL=logging.d.ts.map
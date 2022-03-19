"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlankModule = void 0;
exports.BlankModule = {
    typeName: "blank_module",
    // Config
    // Persistent config is stored and loaded from disk between restarts.
    // Replicated config is what is sent to the remote module, and has a corresponding serializer (ctype).
    // Persistent and replicated config do NOT need to be the same - this is desirable.
    // Identical keys between config types are merged (treated as same)
    // Persistent config takes priority over replicated!!!!
    persistentConfigSchema: {},
    replicatedConfigSchema: {},
    // Raw describes the binary data coming in from the module.
    // Storage describes the data being stored to/from disk.
    // Storage should be a sub-type of Raw, such that some raw values might not be stored.
    rawCType: {},
    storageCType: {},
    replicatedConfigCType: {},
    raw2Human(raw, config, stored2Human) {
        return stored2Human(raw, config);
    },
    stored2Human(raw, config) {
        return {};
    }
};
//# sourceMappingURL=BlankModule.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RunManager_1 = require("./RunManager/RunManager");
const ModuleManager_1 = require("./ModuleManager/ModuleManager");
const FrontendManager_1 = require("./FrontendManager/FrontendManager");
const DAQPathManager_1 = require("./DAQFileManager/DAQPathManager");
const StoredRunManager_1 = require("./RunManager/StoredRunManager");
const TimeSyncServer_1 = require("./TimeSync/TimeSyncServer");
const daqFileManager = new DAQPathManager_1.DAQPathManager(process.env.DAQ_DATA_DIR ?? "./testData");
const storedRunManager = new StoredRunManager_1.StoredRunManager({
    runDataDirectory: daqFileManager.RunDataPath()
});
const moduleManager = new ModuleManager_1.ModuleManager({
    schemaPath: daqFileManager.RealtimeSchemaPath(),
    realtimeMetaPath: daqFileManager.RealtimeMetaPath(),
    mqttUrl: "mqtt://localhost:1883",
    aggregationWindow: 1000,
});
const runManager = new RunManager_1.RunManager(storedRunManager, moduleManager);
const frontendManager = new FrontendManager_1.FrontendManager({
    port: parseInt(process.env.HTTP_PORT) || 3000,
}, runManager);
const timeServer = new TimeSyncServer_1.TimeSyncServer();
//# sourceMappingURL=index.js.map
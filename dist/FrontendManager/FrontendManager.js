"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontendManager = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const ClientManager_1 = require("./ClientManager");
const logging_1 = require("../Util/logging");
const StoredRun_1 = require("../RunManager/StoredRun/StoredRun");
const StreamUtils_1 = require("../StreamUtils");
const StreamUtils_2 = require("../StreamUtils");
const log = logging_1.logger("FrontendManager");
/**
 * Sets up and manages all frontend connections and routes. Responsible for
 * initializing the ClientManager.
 */
class FrontendManager {
    constructor(opts, rm) {
        this._app = express_1.default();
        this._server = http_1.createServer(this._app);
        this._clientManager = new ClientManager_1.ClientManager(rm, this._server);
        this._runManager = rm;
        this.setupRoutes();
        this._server.listen(opts.port, () => log(`Listening on ${opts.port}`));
    }
    setupRoutes() {
        this._app.use(express_1.default.static('public'));
        this._app.get('/csv/:uuid', this.dlCSV.bind(this));
    }
    /**
     * Generates and Serves a CSV for the run passed as a query parameter.
     */
    dlCSV(req, res) {
        const run = this._runManager.resolveRun(req.params.uuid, StoredRun_1.StoredRun);
        //Force the browser to download the file instead of rendering it.
        res.setHeader('Content-disposition', 'attachment; filename=' + run.metaManager().name() + ".csv");
        res.setHeader("content-type", "text/csv");
        run.getDataStream(0, true)
            .pipe(new StreamUtils_1.DataRenamerStream(run.schemaManager()))
            .pipe(new StreamUtils_2.CSVEncoderStream(run.schemaManager().frameInterval()))
            .pipe(res);
    }
}
exports.FrontendManager = FrontendManager;
//# sourceMappingURL=FrontendManager.js.map
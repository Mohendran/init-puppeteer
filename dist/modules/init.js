"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const log = require("log-fn");
const path_1 = require("path");
const settingsLocation = path_1.resolve(__dirname, '../../files/config.json');
exports.init = (credentials) => {
    fs_extra_1.writeJsonSync(settingsLocation, credentials);
    log('Credentials are set.', 'info');
};
//# sourceMappingURL=init.js.map
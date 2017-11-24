"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIMEOUT = 50000;
const SHORT_TIMEOUT = 100;
exports.waitForNetwork = {
    timeout: exports.TIMEOUT,
    waitUntil: 'networkidle0',
};
exports.waitAboutBlank = {
    timeout: SHORT_TIMEOUT,
};
exports.waitForLoad = {
    timeout: exports.TIMEOUT,
    waitUntil: 'load',
};
//# sourceMappingURL=constants.js.map
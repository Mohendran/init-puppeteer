"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LONG_TIMEOUT = 50000;
exports.TIMEOUT = 5000;
exports.SHORT_TIMEOUT = 100;
exports.waitForNetwork = {
    timeout: exports.TIMEOUT,
    waitUntil: 'networkidle0',
};
exports.waitForTimeout = (ms) => ({
    timeout: ms,
});
exports.waitForLoad = {
    timeout: exports.TIMEOUT,
    waitUntil: 'load',
};
//# sourceMappingURL=common.js.map
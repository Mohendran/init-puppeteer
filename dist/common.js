"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LONG_TIMEOUT = 60000;
exports.TIMEOUT = 5000;
exports.SHORT_TIMEOUT = 100;
exports.waitForNetwork = {
    timeout: exports.LONG_TIMEOUT,
    waitUntil: 'networkidle0',
};
exports.getWaitCondition = (condition) => ({
    timeout: exports.LONG_TIMEOUT,
    waitUntil: condition,
});
exports.waitForTimeout = (ms) => ({
    timeout: ms,
    waitUntil: 'networkidle0',
});
//# sourceMappingURL=common.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const clickModule_1 = require("./modules/clickModule");
const init_1 = require("./modules/init");
const typeModule_1 = require("./modules/typeModule");
const common = require("./common");
const defaultHeadless = true;
const defaultURL = 'about:blank';
const webpackURL = 'http://localhost:8080';
const defaultResolution = { x: 1366, y: 768 };
const defaultInput = {
    headless: defaultHeadless,
    resolution: defaultResolution,
    url: defaultURL,
};
function getWait(url) {
    switch (url) {
        case defaultURL:
            return common.waitForTimeout(common.SHORT_TIMEOUT);
        case webpackURL:
            return common.waitForTimeout(common.TIMEOUT);
        default:
            return common.waitForNetwork;
    }
}
async function initPuppeteer(inputRaw) {
    try {
        const inputValue = rambdax_1.defaultTo(defaultInput, inputRaw);
        const resolution = rambdax_1.defaultTo(defaultResolution, inputValue.resolution);
        const url = rambdax_1.defaultTo(defaultURL, inputValue.url);
        const headless = rambdax_1.defaultTo(defaultHeadless, inputValue.headless);
        const input = {
            headless,
            resolution,
            url,
        };
        const { browser, page } = await init_1.init({ input, resolution });
        const wait = getWait(input.url);
        await page.goto(input.url, wait);
        page.on('console', console.log);
        return {
            browser,
            clickModule: clickModule_1.clickModule,
            page,
            typeModule: typeModule_1.typeModule,
        };
    }
    catch (error) {
        throw error;
    }
}
exports.initPuppeteer = initPuppeteer;
exports.waitForLoad = common.waitForLoad;
exports.waitForTimeout = common.waitForTimeout;
exports.waitForNetwork = common.waitForLoad;
exports.LONG_TIMEOUT = common.LONG_TIMEOUT;
exports.SHORT_TIMEOUT = common.SHORT_TIMEOUT;
exports.TIMEOUT = common.TIMEOUT;
//# sourceMappingURL=index.js.map
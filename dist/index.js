"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const clickModule_1 = require("./modules/clickModule");
const constants = require("./constants");
const initPuppeteerModule_1 = require("./modules/initPuppeteerModule");
const typeModule_1 = require("./modules/typeModule");
const defaultHeadless = true;
const defaultURL = 'about:blank';
const defaultResolution = { x: 1366, y: 768 };
const defaultInput = {
    headless: defaultHeadless,
    resolution: defaultResolution,
    url: defaultURL,
};
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
        const { browser, page } = await initPuppeteerModule_1.initPuppeteerModule({ input, resolution });
        const wait = input.url === defaultURL ?
            constants.waitForTimeout :
            constants.waitForNetwork;
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
exports.waitForLoad = constants.waitForLoad;
exports.waitForNetwork = constants.waitForLoad;
//# sourceMappingURL=index.js.map
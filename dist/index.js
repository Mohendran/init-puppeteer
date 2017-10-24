"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const clickModule_1 = require("./modules/clickModule");
const constants = require("./modules/constants");
const initPuppeteerModule_1 = require("./modules/initPuppeteerModule");
const typeModule_1 = require("./modules/typeModule");
const defaultInput = {
    headless: true,
    url: 'about:blank',
};
const defaultResolution = { x: 1366, y: 768 };
async function initPuppeteer(inputRaw) {
    const input = rambdax_1.defaultTo(defaultInput, inputRaw);
    const resolution = rambdax_1.defaultTo(defaultResolution, input.resolution);
    const { browser, page } = await initPuppeteerModule_1.initPuppeteerModule({ input, resolution });
    const condition = input.url === 'about:blank';
    const wait = condition ? constants.waitAboutBlank : constants.waitForNetwork;
    await page.goto(input.url, wait);
    page.on('console', console.log);
    return {
        browser,
        clickModule: clickModule_1.clickModule,
        page,
        typeModule: typeModule_1.typeModule,
    };
}
exports.initPuppeteer = initPuppeteer;
exports.waitForLoad = constants.waitForLoad;
exports.waitForNetwork = constants.waitForLoad;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const clickModule_1 = require("./modules/clickModule");
const constants = require("./modules/constants");
const initPuppeteerModule_1 = require("./modules/initPuppeteerModule");
const typeModule_1 = require("./modules/typeModule");
async function initPuppeteer(input) {
    const resolutionValue = { x: 1366, y: 768 };
    const resolution = rambdax_1.defaultTo(resolutionValue, input.resolution);
    const { browser, page } = await initPuppeteerModule_1.initPuppeteerModule({ input, resolution });
    const condition = input.url === 'about:blank';
    const wait = condition ? constants.waitAboutBlank : constants.waitForNetwork;
    await page.goto(input.url, wait);
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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = require("puppeteer");
const getSettings_1 = require("./getSettings");
async function initPuppeteerModule(input) {
    const settings = getSettings_1.getSettings(input);
    const browser = await puppeteer_1.launch(settings);
    const page = await browser.newPage();
    await page.setViewport({
        height: input.y,
        width: input.x,
    });
    return { browser, page };
}
exports.initPuppeteerModule = initPuppeteerModule;
//# sourceMappingURL=initPuppeteerModule.js.map
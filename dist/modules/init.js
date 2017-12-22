"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = require("puppeteer");
const getSettings_1 = require("./getSettings");
async function init(input) {
    try {
        const settings = getSettings_1.getSettings(input);
        const browser = await puppeteer_1.launch(settings);
        const page = await browser.newPage();
        await page.setViewport({
            height: input.resolution.y,
            width: input.resolution.x,
        });
        return { browser, page };
    }
    catch (err) {
        throw err;
    }
}
exports.init = init;
//# sourceMappingURL=init.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const GITHUB = 'https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md';
const WEBPACK = 'http://localhost:8080';
const ILEARNSMARTER = 'https://ilearnsmarter.com/';
void async function debug() {
    try {
        const { browser, page } = await _1.initPuppeteer({
            headless: false,
            url: GITHUB,
            waitCondition: {
                timeout: 5800,
                waitUntil: 'networkidle2',
            },
        });
        await page.keyboard.down('ArrowUp');
        await browser.close();
        let x;
    }
    catch (e) {
        console.log(e);
    }
}();
//# sourceMappingURL=debug.js.map
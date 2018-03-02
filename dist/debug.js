"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
// tslint:disable
const GITHUB = 'https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md';
const WEBPACK = 'http://localhost:8080';
const ILEARNSMARTER = 'https://ilearnsmarter.com/';
void async function debug() {
    try {
        const { browser, page, $$ } = await _1.initPuppeteer({
            headless: false,
            url: ILEARNSMARTER,
        });
        // await page.keyboard.down('ArrowUp')
        const x = await $$('div', 'result = els.length');
        await browser.close();
    }
    catch (e) {
        console.log(e);
    }
}();
// tslint:enable
//# sourceMappingURL=debug.js.map
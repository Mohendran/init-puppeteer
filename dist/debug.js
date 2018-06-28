"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
// tslint:disable
const GITHUB = 'https://github.com';
const WEBPACK = 'http://localhost:8080';
const ILEARNSMARTER = 'https://ilearnsmarter.com/';
void async function debug() {
    try {
        console.log('start');
        var { browser, page: pageRaw, catchError } = await _1.initPuppeteer({
            headless: false,
            logFlag: false,
            screenOnError: 'CLOUD',
            url: ILEARNSMARTER,
            waitCondition: {
                timeout: 5800,
                waitUntil: 'networkidle2',
            },
        });
        const page = _1.attach(pageRaw);
        // const x = await page.$$eval('div', els => els.length)
        await browser.close();
    }
    catch (e) {
        console.log(e);
        // e = await catchError(e)
        // console.log(e.screen)
    }
}();
// tslint:enable
// await page.keyboard.down('ArrowUp')
//# sourceMappingURL=debug.js.map
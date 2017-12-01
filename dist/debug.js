"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
async function debug() {
    const { browser, page } = await _1.initPuppeteer({
        headless: false,
        url: 'https://ilearnsmarter.com/',
    });
    let x;
}
debug();
//# sourceMappingURL=debug.js.map
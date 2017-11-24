"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
async function debug() {
    let x;
    const { browser, page } = await _1.initPuppeteer({
        headless: false,
        url: 'https://ilearnsmarter.com/',
    });
    let a;
}
debug();
//# sourceMappingURL=debug.js.map
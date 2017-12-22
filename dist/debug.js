"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
async function debug() {
    const { browser, page } = await _1.initPuppeteer({
        headless: false,
        url: 'http://localhost:8080',
    });
    let x;
}
debug();
//# sourceMappingURL=debug.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_helpers_1 = require("client-helpers");
const rambdax_1 = require("rambdax");
const clickModule_1 = require("./modules/clickModule");
const common = require("./common");
const init_1 = require("./modules/init");
const typeModule_1 = require("./modules/typeModule");
const defaultHeadless = true;
const defaultURL = 'about:blank';
const webpackURL = 'http://localhost:8080';
const defaultResolution = { x: 1366, y: 768 };
const defaultInput = {
    headless: defaultHeadless,
    resolution: defaultResolution,
    url: defaultURL,
    waitCondition: common.waitForNetwork,
};
function getWait(url, waitCondition) {
    const urlFlag = url === defaultURL ?
        common.waitForTimeout(common.SHORT_TIMEOUT) :
        url === webpackURL ?
            common.waitForTimeout(common.TIMEOUT) :
            false;
    if (urlFlag === false && waitCondition === undefined) {
        return common.waitForNetwork;
    }
    if (typeof waitCondition === 'string') {
        const conditionMap = {
            DOM: 'domcontentloaded',
            LOAD: 'load',
            NETWORK: 'networkidle0',
        };
        const answer = conditionMap[waitCondition] === undefined;
        const condition = answer ?
            'load' :
            conditionMap[waitCondition];
        return common.getWaitCondition(condition);
    }
    return waitCondition;
}
async function initPuppeteer(inputRaw) {
    try {
        const input = {
            ...defaultInput,
            ...rambdax_1.defaultTo({}, inputRaw),
        };
        var { browser, page } = await init_1.init(input);
        const wait = getWait(input.url, input.waitCondition);
        await page.goto(input.url, wait);
        page.on('console', console.log);
        const $ = client_helpers_1.dollar(page);
        const $$ = client_helpers_1.doubleDollar(page);
        return {
            $,
            $$,
            browser,
            clickModule: clickModule_1.clickModule,
            page,
            typeModule: typeModule_1.typeModule,
        };
    }
    catch (error) {
        if (page !== undefined && page.close !== undefined) {
            const screenshotPath = `${__dirname}/${Date.now()}.png`;
            await page.screenshot({
                fullPage: true,
                path: screenshotPath,
            });
            console.log('screenshotPath', screenshotPath);
            error.screen = screenshotPath;
            await browser.close();
        }
        throw error;
    }
}
exports.initPuppeteer = initPuppeteer;
exports.waitForTimeout = common.waitForTimeout;
exports.waitForNetwork = common.waitForNetwork;
exports.LONG_TIMEOUT = common.LONG_TIMEOUT;
exports.SHORT_TIMEOUT = common.SHORT_TIMEOUT;
exports.TIMEOUT = common.TIMEOUT;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const rambdax_1 = require("rambdax");
const imgur_1 = require("imgur");
// import * as imgur from 'imgur'
async function takeScreenshot(page, screenOnError) {
    try {
        if (screenOnError === 'OFF') {
            return 'OFF';
        }
        const screenshotPath = `${__dirname}/${Date.now()}.png`;
        await page.screenshot({
            fullPage: true,
            path: screenshotPath,
        });
        if (screenOnError === 'LOCAL') {
            return screenshotPath;
        }
        const uploadResult = await imgur_1.uploadFile(screenshotPath);
        fs_1.unlinkSync(screenshotPath);
        return rambdax_1.path('data.link', uploadResult);
    }
    catch (err) {
        throw err;
    }
}
exports.takeScreenshot = takeScreenshot;
//# sourceMappingURL=takeScreenshot.js.map
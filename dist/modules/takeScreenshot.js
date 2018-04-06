"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import {uploadFile} from 'imgur'
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
        // const uploadResult = await uploadFile(screenshotPath)
        // unlinkSync(screenshotPath)
        // return path(
        //   'data.link',
        //   uploadResult
        // )
    }
    catch (err) {
        throw err;
    }
}
exports.takeScreenshot = takeScreenshot;
//# sourceMappingURL=takeScreenshot.js.map
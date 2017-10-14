"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
exports.typeModule = async ({ page, text, selector }) => {
    await page.focus(selector);
    const textAsArray = rambdax_1.split('', text);
    return rambdax_1.mapAsync(async (char) => {
        await page.keyboard.sendCharacter(char);
        await rambdax_1.delay(100);
    }, textAsArray);
};
//# sourceMappingURL=typeModule.js.map
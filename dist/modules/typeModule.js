"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
exports.typeModule = async (input) => {
    await input.page.focus(input.selector);
    const textAsArray = rambdax_1.split('', input.text);
    return rambdax_1.mapAsync(async (char) => {
        await input.page.keyboard.sendCharacter(char);
        await rambdax_1.delay(100);
    }, textAsArray);
};
//# sourceMappingURL=typeModule.js.map
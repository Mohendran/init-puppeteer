"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const click = (selector) => {
    const element = document.querySelector(selector);
    if (element === null) {
        throw `cannot click element with selector '${selector}'`;
    }
    element.click();
};
exports.clickModule = async (input) => input.page.evaluate(click, input.selector);
//# sourceMappingURL=clickModule.js.map
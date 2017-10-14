"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getCurrentTag_1 = require("./getCurrentTag");
const getNextTag_1 = require("./getNextTag");
exports.getTagValue = async (x) => {
    if (x.input.tag !== undefined) {
        return x.input.tag;
    }
    const currentTag = await x.page.evaluate(getCurrentTag_1.getCurrentTag);
    return getNextTag_1.getNextTag(currentTag);
};
//# sourceMappingURL=getTagValue.js.map
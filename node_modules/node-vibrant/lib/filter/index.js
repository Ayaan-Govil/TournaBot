"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineFilters = void 0;
var default_1 = require("./default");
Object.defineProperty(exports, "Default", { enumerable: true, get: function () { return default_1.default; } });
function combineFilters(filters) {
    // TODO: caching
    if (!Array.isArray(filters) || filters.length === 0)
        return null;
    return function (r, g, b, a) {
        if (a === 0)
            return false;
        for (var i = 0; i < filters.length; i++) {
            if (!filters[i](r, g, b, a))
                return false;
        }
        return true;
    };
}
exports.combineFilters = combineFilters;
//# sourceMappingURL=index.js.map
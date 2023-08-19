"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
var isAuthenticated = function (_a) {
    var req = _a.req;
    return Boolean(req.user);
};
exports.isAuthenticated = isAuthenticated;

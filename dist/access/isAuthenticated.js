"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const isAuthenticated = ({ req }) => {
    return Boolean(req.user);
};
exports.isAuthenticated = isAuthenticated;

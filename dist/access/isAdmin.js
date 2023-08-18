"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdminFieldLevel = exports.isAdmin = void 0;
const isAdmin = ({ req: { user } }) => {
    var _a;
    // Return true or false based on if the user has an admin role
    return Boolean((_a = user === null || user === void 0 ? void 0 : user.roles) === null || _a === void 0 ? void 0 : _a.includes('admin'));
};
exports.isAdmin = isAdmin;
const isAdminFieldLevel = ({ req: { user } }) => {
    var _a;
    // Return true or false based on if the user has an admin role
    return Boolean((_a = user === null || user === void 0 ? void 0 : user.roles) === null || _a === void 0 ? void 0 : _a.includes('admin'));
};
exports.isAdminFieldLevel = isAdminFieldLevel;

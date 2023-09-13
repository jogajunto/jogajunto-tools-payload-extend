"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disableUpdateEmail = void 0;
const disableUpdateEmail = async ({ data, req: { payload }, operation, originalDoc, }) => {
    if (operation === 'update' &&
        data.email &&
        data.email !== originalDoc.email) {
        throw new Error('Não é possível alterar seu e-mail.');
    }
    return data;
};
exports.disableUpdateEmail = disableUpdateEmail;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePasswords = void 0;
const validatePasswords = async ({ data, req: { payload }, operation, originalDoc, }) => {
    if (operation === 'create' || (operation === 'update' && data.password)) {
        // Pelo menos 8 caracteres
        const MIN_LENGTH = 8;
        if (typeof data.password !== 'string') {
            throw new Error('A senha deve ser uma string.');
        }
        if (data.password.length < MIN_LENGTH) {
            throw new Error('A senha deve ter pelo menos 8 caracteres.');
        }
        // Pelo menos um número
        if (!/\d/.test(data.password)) {
            throw new Error('A senha deve conter pelo menos um número.');
        }
        // Pelo menos uma letra minúscula
        if (!/[a-z]/.test(data.password)) {
            throw new Error('A senha deve conter pelo menos uma letra minúscula.');
        }
        // Pelo menos uma letra maiúscula
        if (!/[A-Z]/.test(data.password)) {
            throw new Error('A senha deve conter pelo menos uma letra maiúscula.');
        }
        // Pelo menos um caractere especial
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
            throw new Error('A senha deve conter pelo menos um caractere especial.');
        }
    }
    return data;
};
exports.validatePasswords = validatePasswords;

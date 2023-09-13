"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isAdmin_1 = require("../../access/isAdmin");
const isNewUserForToken_1 = __importDefault(require("../../access/isNewUserForToken"));
const TokenGenerator_1 = __importDefault(require("../components/TokenGenerator"));
const TokenNewUsers = {
    slug: 'tokennewusers',
    labels: {
        singular: 'Token de Novo Usuário',
        plural: 'Tokens para Novos Usuários',
    },
    access: {
        create: isAdmin_1.isAdmin,
        read: isAdmin_1.isAdmin ?? isNewUserForToken_1.default,
    },
    admin: {
        useAsTitle: 'id',
        disableDuplicate: true,
        hideAPIURL: true,
        group: 'Admin',
    },
    fields: [
        {
            name: 'token',
            label: 'Token JWT',
            type: 'text',
            required: true,
            unique: true,
            access: {
                create: isAdmin_1.isAdminFieldLevel,
                update: isAdmin_1.isAdminFieldLevel,
            },
            admin: {
                description: 'Gere um token para um link de cadastro',
                components: {
                    Field: TokenGenerator_1.default,
                },
            },
        },
        {
            name: 'used',
            type: 'checkbox',
            admin: {
                readOnly: true,
            },
        },
    ],
};
exports.default = TokenNewUsers;

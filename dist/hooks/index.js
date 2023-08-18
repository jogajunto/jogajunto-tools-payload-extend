"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalAfterDelete = exports.globalAfterChange = void 0;
// src/hooks/index.ts
var globalAfterChange_1 = require("./globalAfterChange");
Object.defineProperty(exports, "globalAfterChange", { enumerable: true, get: function () { return __importDefault(globalAfterChange_1).default; } });
var globalAfterDelete_1 = require("./globalAfterDelete");
Object.defineProperty(exports, "globalAfterDelete", { enumerable: true, get: function () { return __importDefault(globalAfterDelete_1).default; } });

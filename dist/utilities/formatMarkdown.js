"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var js_yaml_1 = __importDefault(require("js-yaml"));
var lodash_1 = __importDefault(require("lodash"));
var formatMarkdown = function (doc, collectionName, payload, formatters) { return __awaiter(void 0, void 0, void 0, function () {
    var dataFormatter, data, content, _i, _a, block, _b, idUpload, mediaFile, filename, urlFile, yamlText, fileContent;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                dataFormatter = formatters[collectionName];
                if (!dataFormatter) {
                    throw new Error("Formatter for collection \"".concat(collectionName, "\" not found."));
                }
                return [4 /*yield*/, dataFormatter(doc, payload)];
            case 1:
                data = _c.sent();
                content = '\n';
                _i = 0, _a = doc.content;
                _c.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3 /*break*/, 10];
                block = _a[_i];
                console.log(block.type);
                _b = block.type;
                switch (_b) {
                    case 'h2': return [3 /*break*/, 3];
                    case 'upload': return [3 /*break*/, 4];
                    case 'ul': return [3 /*break*/, 7];
                }
                return [3 /*break*/, 8];
            case 3:
                content += "## ".concat(block.children[0].text, "\n\n");
                return [3 /*break*/, 9];
            case 4:
                idUpload = block.value.id;
                if (!idUpload) return [3 /*break*/, 6];
                return [4 /*yield*/, payload.findByID({
                        collection: 'media',
                        id: idUpload,
                    })];
            case 5:
                mediaFile = _c.sent();
                if (mediaFile) {
                    filename = mediaFile.filename;
                    urlFile = mediaFile.url;
                    content += "![".concat(filename, "](").concat(urlFile, ")\n");
                }
                _c.label = 6;
            case 6: return [3 /*break*/, 9];
            case 7:
                // Block type UL
                block.children.forEach(function (listItem) {
                    content += '- ';
                    listItem.children.forEach(function (child) {
                        var text = child.text;
                        if (child.bold) {
                            text = "**".concat(text, "**");
                        }
                        if (child.italic) {
                            text = "_".concat(text, "_");
                        }
                        if (child.type === 'link') {
                            child.children.forEach(function (linkChild) {
                                text = "[".concat(linkChild.text, "](").concat(child.url, ")");
                            });
                        }
                        content += lodash_1.default.trim(text, '\n');
                    });
                    content += '\n';
                });
                return [3 /*break*/, 9];
            case 8:
                if (block.children.text != '') {
                    // Block type any
                    block.children.forEach(function (child) {
                        var text = child.text;
                        if (child.bold) {
                            text = "**".concat(text, "**");
                        }
                        if (child.type === 'link') {
                            text = "[".concat(text, "](").concat(child.url, ")");
                        }
                        if (child.italic) {
                            text = "_".concat(text, "_");
                        }
                        content += lodash_1.default.trim(text, '\n');
                    });
                    if (block.children.length > 0) {
                        content += '\n\n'; // Add two newlines to create a new paragraph in Markdown
                    }
                }
                return [3 /*break*/, 9];
            case 9:
                _i++;
                return [3 /*break*/, 2];
            case 10:
                yamlText = js_yaml_1.default.dump(data);
                fileContent = "---\n".concat(yamlText, "---\n").concat(content);
                return [2 /*return*/, fileContent];
        }
    });
}); };
exports.default = formatMarkdown;

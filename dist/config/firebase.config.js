"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeDB = exports.readDB = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dbPath = path_1.default.resolve("./src/config/database.json");
const readDB = () => {
    const data = fs_1.default.readFileSync(dbPath, "utf8");
    return JSON.parse(data);
};
exports.readDB = readDB;
const writeDB = (data) => {
    fs_1.default.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};
exports.writeDB = writeDB;
//# sourceMappingURL=firebase.config.js.map
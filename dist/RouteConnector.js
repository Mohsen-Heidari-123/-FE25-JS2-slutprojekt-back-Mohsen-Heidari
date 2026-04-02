"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesConnector = void 0;
const express_1 = __importDefault(require("express"));
const membersRoutes_1 = require("./routes/membersRoutes");
const taskRouter_1 = require("./routes/taskRouter");
const RoutesConnector = express_1.default.Router();
exports.RoutesConnector = RoutesConnector;
RoutesConnector.use(membersRoutes_1.membersRoutes);
RoutesConnector.use(taskRouter_1.TaskManagement);
//# sourceMappingURL=RouteConnector.js.map
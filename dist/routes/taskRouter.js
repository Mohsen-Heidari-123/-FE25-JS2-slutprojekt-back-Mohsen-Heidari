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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskManagement = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const category_1 = require("../database/category");
const TaskManagement = express_1.default.Router();
exports.TaskManagement = TaskManagement;
TaskManagement.get("/assignments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, category_1.get_all_assignments)();
    res.status(200).json(result);
}));
TaskManagement.post("/assignments", [
    (0, express_validator_1.body)("title").isLength({ min: 1 }),
    (0, express_validator_1.body)("description").isLength({ min: 1 }),
    (0, express_validator_1.body)("category").isIn(["UX", "Frontend", "Backend"]),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, category } = req.body;
    const result = yield (0, category_1.add_New_Assignment)(title, description, category);
    res.status(201).json(result);
}));
TaskManagement.patch("/assignments/:assignmentId/assign/:memberId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { assignmentId, memberId } = req.params;
    if (typeof assignmentId === "string" && typeof memberId === "string") {
        const result = yield (0, category_1.assign_Task_To_Member)(assignmentId, memberId);
        res.status(200).json(result);
    }
    else {
        res.status(400).json({ status: false, message: "Invalid ID parameter" });
    }
}));
TaskManagement.patch("/assignments/:assignmentId/done", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { assignmentId } = req.params;
    if (typeof assignmentId === "string") {
        const result = yield (0, category_1.mark_Task_Done)(assignmentId);
        res.status(200).json(result);
    }
    else {
        res.status(400).json({ status: false, message: "Invalid ID parameter" });
    }
}));
TaskManagement.delete("/assignments/:assignmentId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { assignmentId } = req.params;
    if (typeof assignmentId === "string") {
        const result = yield (0, category_1.delete_Task)(assignmentId);
        res.status(200).json(result);
    }
    else {
        res.status(400).json({ status: false, message: "Invalid assignmentId parameter" });
    }
}));
//# sourceMappingURL=taskRouter.js.map
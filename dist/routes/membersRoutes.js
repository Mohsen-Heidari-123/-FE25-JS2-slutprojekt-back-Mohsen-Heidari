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
exports.membersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const member_1 = require("../database/member");
const membersRoutes = express_1.default.Router();
exports.membersRoutes = membersRoutes;
membersRoutes.get("/members", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, member_1.get_all_member)();
    res.status(200).json(result);
}));
membersRoutes.get("/members/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (typeof id === 'string') {
        const result = yield (0, member_1.get_single_member)(id);
        res.status(200).json(result);
    }
    else {
        res.status(400).json({ status: false, message: "Invalid ID parameter" });
    }
}));
membersRoutes.post("/members", [
    (0, express_validator_1.body)("name").isLength({ min: 1, max: 45 }),
    (0, express_validator_1.body)("category").isIn(["UX", "Frontend", "Backend"]),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, category } = req.body;
    const result = yield (0, member_1.add_New_Member)(name, category);
    res.status(201).json(result);
}));
membersRoutes.patch("/members/:id", [
    (0, express_validator_1.body)("name").optional().isLength({ min: 1, max: 45 }),
    (0, express_validator_1.body)("category").optional().isIn(["UX", "Frontend", "Backend"]),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, category } = req.body;
    const result = yield (0, member_1.update_member)(req.params.id, name, category);
    res.status(200).json(result);
}));
membersRoutes.delete("/members/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (typeof id === 'string') {
        const result = yield (0, member_1.delete_member)(id);
        res.status(200).json(result);
    }
    else {
        res.status(400).json({ status: false, message: "Invalid ID parameter" });
    }
}));
membersRoutes.get("/members/category/:category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.params.category;
    const result = yield (0, member_1.get_members_by_category)(category);
    res.status(200).json(result);
}));
membersRoutes.get("/members/:id/assignments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (typeof id === "string") {
        const result = yield (0, member_1.get_member_assignments)(id);
        res.status(200).json(result);
    }
    else {
        res.status(400).json({ status: false, message: "Invalid ID parameter" });
    }
}));
//# sourceMappingURL=membersRoutes.js.map
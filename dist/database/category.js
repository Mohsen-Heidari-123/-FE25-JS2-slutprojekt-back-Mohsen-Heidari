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
Object.defineProperty(exports, "__esModule", { value: true });
exports.delete_Task = exports.mark_Task_Done = exports.assign_Task_To_Member = exports.get_all_assignments = exports.add_New_Assignment = void 0;
const firebase_config_1 = require("../config/firebase.config");
const crypto_1 = require("crypto");
const add_New_Assignment = (title, description, category) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, firebase_config_1.readDB)();
    const assignment = {
        id: (0, crypto_1.randomUUID)(),
        title,
        description,
        category,
        status: "new",
        assignedTo: null,
        timestamp: new Date().toISOString()
    };
    db.assignments.push(assignment);
    (0, firebase_config_1.writeDB)(db);
    return { status: true, details: assignment };
});
exports.add_New_Assignment = add_New_Assignment;
const get_all_assignments = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, firebase_config_1.readDB)();
    return { status: true, details: db.assignments };
});
exports.get_all_assignments = get_all_assignments;
const assign_Task_To_Member = (assignmentId, memberId) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, firebase_config_1.readDB)();
    const assignment = db.assignments.find(a => a.id === assignmentId);
    const member = db.members.find(m => m.id === memberId);
    if (!assignment || !member) {
        return { status: false, message: "Not found" };
    }
    if (assignment.category !== member.category) {
        return { status: false, message: "Category mismatch" };
    }
    assignment.assignedTo = memberId;
    assignment.status = "doing";
    (0, firebase_config_1.writeDB)(db);
    return { status: true };
});
exports.assign_Task_To_Member = assign_Task_To_Member;
const mark_Task_Done = (assignmentId) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, firebase_config_1.readDB)();
    const assignment = db.assignments.find(a => a.id === assignmentId);
    if (!assignment)
        return { status: false };
    assignment.status = "done";
    (0, firebase_config_1.writeDB)(db);
    return { status: true };
});
exports.mark_Task_Done = mark_Task_Done;
const delete_Task = (assignmentId) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, firebase_config_1.readDB)();
    db.assignments = db.assignments.filter(a => a.id !== assignmentId);
    (0, firebase_config_1.writeDB)(db);
    return { status: true };
});
exports.delete_Task = delete_Task;
//# sourceMappingURL=category.js.map
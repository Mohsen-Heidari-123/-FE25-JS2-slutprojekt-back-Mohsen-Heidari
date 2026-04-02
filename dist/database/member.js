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
exports.get_member_assignments = exports.get_members_by_category = exports.delete_member = exports.update_member = exports.get_single_member = exports.get_all_member = exports.add_New_Member = void 0;
const firebase_config_1 = require("../config/firebase.config");
const crypto_1 = require("crypto");
const add_New_Member = (name, category) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, firebase_config_1.readDB)();
    const member = {
        id: (0, crypto_1.randomUUID)(),
        name,
        category
    };
    db.members.push(member);
    (0, firebase_config_1.writeDB)(db);
    return { status: true, details: member };
});
exports.add_New_Member = add_New_Member;
const get_all_member = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, firebase_config_1.readDB)();
    return { status: true, details: db.members };
});
exports.get_all_member = get_all_member;
const get_single_member = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, firebase_config_1.readDB)();
    const member = db.members.find(m => m.id === id);
    if (!member) {
        return { status: false, message: "Member not found" };
    }
    return { status: true, details: member };
});
exports.get_single_member = get_single_member;
const update_member = (id, name, category) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, firebase_config_1.readDB)();
    const member = db.members.find(m => m.id === id);
    if (!member) {
        return { status: false, message: "Member not found" };
    }
    if (name)
        member.name = name;
    if (category)
        member.category = category;
    (0, firebase_config_1.writeDB)(db);
    return { status: true };
});
exports.update_member = update_member;
const delete_member = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, firebase_config_1.readDB)();
    db.members = db.members.filter(m => m.id !== id);
    (0, firebase_config_1.writeDB)(db);
    return { status: true };
});
exports.delete_member = delete_member;
const get_members_by_category = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, firebase_config_1.readDB)();
    const members = db.members.filter(m => m.category === category);
    return { status: true, details: members };
});
exports.get_members_by_category = get_members_by_category;
const get_member_assignments = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    const db = (0, firebase_config_1.readDB)();
    const assignments = db.assignments.filter(a => a.assignedTo === memberId);
    return { status: true, details: assignments };
});
exports.get_member_assignments = get_member_assignments;
//# sourceMappingURL=member.js.map
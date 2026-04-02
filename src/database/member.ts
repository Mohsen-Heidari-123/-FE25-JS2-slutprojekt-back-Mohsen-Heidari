import { readDB, writeDB } from "../config/firebase.config";
import { randomUUID } from "crypto";

type Category = "UX" | "Frontend" | "Backend";

interface Member {
  id: string;
  name: string;
  category: Category;
}

export const add_New_Member = async (name: string, category: Category) => {
  const db = readDB();

  const member: Member = {
    id: randomUUID(),
    name,
    category
  };

  db.members.push(member);
  writeDB(db);

  return { status: true, details: member };
};

export const get_all_member = async () => {
  const db = readDB();
  return { status: true, details: db.members };
};

export const get_single_member = async (id: string) => {
  const db = readDB();

  const member = db.members.find(m => m.id === id);

  if (!member) {
    return { status: false, message: "Member not found" };
  }

  return { status: true, details: member };
};

export const update_member = async (
  id: string,
  name?: string,
  category?: Category
) => {
  const db = readDB();

  const member = db.members.find(m => m.id === id);

  if (!member) {
    return { status: false, message: "Member not found" };
  }

  if (name) member.name = name;
  if (category) member.category = category;

  writeDB(db);

  return { status: true };
};

export const delete_member = async (id: string) => {
  const db = readDB();

  db.members = db.members.filter(m => m.id !== id);

  writeDB(db);

  return { status: true };
};

export const get_members_by_category = async (category: Category) => {
  const db = readDB();

  const members = db.members.filter(m => m.category === category);

  return { status: true, details: members };
};

export const get_member_assignments = async (memberId: string) => {
  const db = readDB();

  const assignments = db.assignments.filter(
    a => a.assignedTo === memberId
  );

  return { status: true, details: assignments };
};

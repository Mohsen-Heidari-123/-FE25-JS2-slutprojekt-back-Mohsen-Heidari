import { readDB, writeDB } from "../config/firebase.config";
import { randomUUID } from "crypto";

type Status = "new" | "doing" | "done";
type Category = "UX" | "Frontend" | "Backend";

interface Assignment {
  id: string;
  title: string;
  description: string;
  category: Category;
  status: Status;
  assignedTo: string | null;
  timestamp: string;
}

export const add_New_Assignment = async (
  title: string,
  description: string,
  category: Category
) => {
  const db = readDB();

  const assignment: Assignment = {
    id: randomUUID(),
    title,
    description,
    category,
    status: "new",
    assignedTo: null,
    timestamp: new Date().toISOString()
  };

  db.assignments.push(assignment);
  writeDB(db);

  return { status: true, details: assignment };
};

export const get_all_assignments = async () => {
  const db = readDB();
  return { status: true, details: db.assignments };
};

export const assign_Task_To_Member = async (
  assignmentId: string,
  memberId: string
) => {
  const db = readDB();

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

  writeDB(db);

  return { status: true };
};

export const mark_Task_Done = async (assignmentId: string) => {
  const db = readDB();

  const assignment = db.assignments.find(a => a.id === assignmentId);

  if (!assignment) return { status: false };

  assignment.status = "done";
  writeDB(db);

  return { status: true };
};

export const delete_Task = async (assignmentId: string) => {
  const db = readDB();

  db.assignments = db.assignments.filter(a => a.id !== assignmentId);

  writeDB(db);

  return { status: true };
};

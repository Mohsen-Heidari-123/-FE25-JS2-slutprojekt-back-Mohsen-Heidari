import fs from "fs";
import path from "path";

const dbPath = path.resolve("./src/config/database.json");

type Status = "new" | "doing" | "done";
type Category = "UX" | "Frontend" | "Backend";

export interface Member {
  id: string;
  name: string;
  category: Category;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  category: Category;
  status: Status;
  assignedTo: string | null;
  timestamp: string;
}

export interface Database {
  members: Member[];
  assignments: Assignment[];
}

export const readDB = (): Database => {
  const data = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(data);
};

export const writeDB = (data: Database) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

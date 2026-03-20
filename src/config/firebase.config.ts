import fs from "fs";
import path from "path";

const dbPath = path.resolve("./src/config/database.json");

export interface Database {
  members: any[];
  assignments: any[];
}

export const readDB = (): Database => {
  const data = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(data);
};

export const writeDB = (data: Database) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

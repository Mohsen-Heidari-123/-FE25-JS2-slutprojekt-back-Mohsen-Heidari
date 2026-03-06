import express, { type Request, type Response } from 'express';
import {body, validationResult } from "express-validator";

import {
  add_New_Assignment,
  get_all_assignments,
  assign_Task_To_Member,
  mark_Task_Done,
  delete_Task
} from "../database/category.ts";

const TaskManagement = express.Router();

TaskManagement.get("/assignments", async (req: Request, res: Response) => {
  const result = await get_all_assignments();
  res.status(200).json(result);
});

TaskManagement.post(
  "/assignments",
  [
    body("title").isLength({ min: 1 }),
    body("description").isLength({ min: 1 }),
    body("category").isIn(["UX", "Frontend", "Backend"]),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, category } = req.body;
    const result = await add_New_Assignment(title, description, category);
    res.status(201).json(result);
  }
);

TaskManagement.patch(
  "/assignments/:assignmentId/assign/:memberId",
  async (req: Request, res: Response) => {
    const { assignmentId, memberId } = req.params;
    if(typeof assignmentId === "string" && typeof memberId === "string"){
        const result = await assign_Task_To_Member(assignmentId, memberId);
        res.status(200).json(result);
    }else{
        res.status(400).json({ status: false, message: "Invalid ID parameter" });   
    }
  }
);

TaskManagement.patch(
  "/assignments/:assignmentId/done",
  async (req: Request, res: Response) => {
    const { assignmentId } = req.params;
    if(typeof assignmentId === "string"){
        const result = await mark_Task_Done(assignmentId);
        res.status(200).json(result);
    }else{
        res.status(400).json({ status: false, message: "Invalid ID parameter" });
    }
  }
);

TaskManagement.delete(
  "/assignments/:assignmentId",
  async (req: Request, res: Response) => {
    const { assignmentId } = req.params;
    if(typeof assignmentId === "string"){
        const result = await delete_Task(assignmentId);
        res.status(200).json(result);
    }else{
        res.status(400).json({ status: false, message: "Invalid assignmentId parameter" });
    }
  }
);



export { TaskManagement }; 


import express, { type Request, type Response } from 'express';
import {body, validationResult } from "express-validator";

import {
  add_New_Member,
  get_all_member,
  get_single_member,
  update_member,
  delete_member,
  get_members_by_category,
  get_member_assignments
} from "../database/member.ts";

const membersRoutes = express.Router();

membersRoutes.get("/members", async (req: Request, res: Response) => {
  const result = await get_all_member();
  res.status(200).json(result);
});

membersRoutes.get("/members/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
  
  if (typeof id === 'string') {
      const result = await get_single_member(id);
      res.status(200).json(result);
  }else{
    res.status(400).json({ status: false, message: "Invalid ID parameter" });
  }
});


membersRoutes.post(
  "/members",
  [
    body("name").isLength({ min: 1, max: 45 }),
    body("category").isIn(["UX", "Frontend", "Backend"]),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, category } = req.body;
    const result = await add_New_Member(name, category);
    res.status(201).json(result);
  }
);

membersRoutes.patch(
  "/members/:id",
  [
    body("name").optional().isLength({ min: 1, max: 45 }),
    body("category").optional().isIn(["UX", "Frontend", "Backend"]),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, category } = req.body;
const result = await update_member(req.params.id as string, name, category);
    res.status(200).json(result);
  }
);

membersRoutes.delete("/members/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  
  if (typeof id === 'string') {
    const result = await delete_member(id);
    res.status(200).json(result);
  } else {
    res.status(400).json({ status: false, message: "Invalid ID parameter" });
  }
});

membersRoutes.get("/members/category/:category", async (req: Request, res: Response) => {
  const category = req.params.category as "UX" | "Frontend" | "Backend";
  
  const result = await get_members_by_category(category);
  res.status(200).json(result);
});


membersRoutes.get("/members/:id/assignments", async (req: Request, res: Response) => {
    const id = req.params.id;
    if(typeof id === "string"){
        const result = await get_member_assignments(id);
        res.status(200).json(result);
    }else{
        res.status(400).json({ status: false, message: "Invalid ID parameter" });
    }
});


export { membersRoutes }; 
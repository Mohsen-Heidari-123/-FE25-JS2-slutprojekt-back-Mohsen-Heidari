import { db } from "../config/firebase.config.ts";

type Status = "new" | "doing" | "done";

interface Assignment {
  id: string;
  title: string;
  description: string;
  category: "UX" | "Frontend" | "Backend";
  status: Status;
  assignedTo: string | null;
  timestamp: string;
}


const add_New_Assignment = async (
  title: string,
  description: string,
  category: string
) => {
  try {
    const newRef = db.ref("assignments").push();

    const assignment: Assignment = {
      id: newRef.key as string,
      title,
      description,
      category: category as "UX" | "Frontend" | "Backend",
      status: "new",
      assignedTo: null,
      timestamp: new Date().toISOString(),
    };

    await newRef.set(assignment);

    return { status: true, message: "Assignment created", details: assignment };
  } catch (error) {
    return { status: false, message: "Failed to create assignment", details: error };
  }
};


const get_all_assignments = async () => {
  try {
    const snapshot = await db.ref("assignments").get();
    return { status: true, message: "Assignments retrieved", details: snapshot.val() };
  } catch (error) {
    return { status: false, message: "Failed to retrieve assignments", details: error };
  }
};


const assign_Task_To_Member = async (assignmentId: string, memberId: string) => {
  try {
    const assignmentRef = db.ref(`assignments/${assignmentId}`);
    const memberRef = db.ref(`members/${memberId}`);

    const assignmentSnap = await assignmentRef.get();
    const memberSnap = await memberRef.get();

    if (!assignmentSnap.exists() || !memberSnap.exists()) {
      return { status: false, message: "Assignment or Member not found" };
    }

    const assignment = assignmentSnap.val();
    const member = memberSnap.val();

    if (assignment.category !== member.category) {
      return { status: false, message: "Category mismatch. Cannot assign." };
    }

    await assignmentRef.update({
      assignedTo: memberId,
      status: "doing",
    });

    return { status: true, message: "Task assigned successfully" };
  } catch (error) {
    return { status: false, message: "Failed to assign task", details: error };
  }
};

const mark_Task_Done = async (assignmentId: string) => {
  try {
    await db.ref(`assignments/${assignmentId}`).update({
      status: "done",
    });

    return { status: true, message: "Task marked as done" };
  } catch (error) {
    return { status: false, message: "Failed to update task", details: error };
  }
};

const delete_Task = async (assignmentId: string) => {
  try {
    await db.ref(`assignments/${assignmentId}`).remove();
    return { status: true, message: "Task deleted successfully" };
  } catch (error) {
    return { status: false, message: "Failed to delete task", details: error };
  }
};

export {
  add_New_Assignment,
  get_all_assignments,
  assign_Task_To_Member,
  mark_Task_Done,
  delete_Task,
};
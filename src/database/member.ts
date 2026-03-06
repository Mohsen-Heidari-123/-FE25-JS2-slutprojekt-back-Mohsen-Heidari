import { db } from "../config/firebase.config.ts";

type Category = "UX" | "Frontend" | "Backend";

interface Member {
  id: string;
  name: string;
  category: Category;
}


const add_New_Member = async (name: string, category: Category) => {
  try {
    const newRef = db.ref("members").push();

    const member: Member = {
      id: newRef.key as string,
      name,
      category,
    };

    await newRef.set(member);

    return { status: true, message: "Member created", details: member };
  } catch (error) {
    return { status: false, message: "Failed to create member", details: error };
  }
};


const get_all_member = async () => {
  try {
    const snapshot = await db.ref("members").get();
    return { status: true, details: snapshot.val() };
  } catch (error) {
    return { status: false, message: "Failed to retrieve members", details: error };
  }
};


const get_single_member = async (id: string) => {
  try {
    const snapshot = await db.ref(`members/${id}`).get();

    if (!snapshot.exists()) {
      return { status: false, message: "Member not found" };
    }

    return { status: true, details: snapshot.val() };
  } catch (error) {
    return { status: false, message: "Failed to retrieve member", details: error };
  }
};

const update_member = async (
  id: string,
  name?: string,
  category?: Category
) => {
  try {
    const snapshot = await db.ref(`members/${id}`).get();

    if (!snapshot.exists()) {
      return { status: false, message: "Member not found" };
    }

    const updateData: { name?: string; category?: Category } = {};

    if (name !== undefined) {
      updateData.name = name;
    }

    if (category !== undefined) {
      updateData.category = category;
    }

    await db.ref(`members/${id}`).update(updateData);

    return { status: true, message: "Member updated successfully" };

  } catch (error) {
    return {
      status: false,
      message: "Failed to update member",
      details: error
    };
  }
};

const delete_member = async (id: string) => {
  try {
    await db.ref(`members/${id}`).remove();
    return { status: true, message: "Member deleted successfully" };
  } catch (error) {
    return { status: false, message: "Failed to delete member", details: error };
  }
};


const get_members_by_category = async (category: Category) => {
  try {
    const snapshot = await db.ref("members")
      .orderByChild("category")
      .equalTo(category)
      .get();

    return { status: true, details: snapshot.val() };
  } catch (error) {
    return { status: false, message: "Failed to filter members", details: error };
  }
};


const get_member_assignments = async (memberId: string) => {
  try {
    const snapshot = await db.ref("assignments")
      .orderByChild("assignedTo")
      .equalTo(memberId)
      .get();

    return { status: true, details: snapshot.val() };
  } catch (error) {
    return { status: false, message: "Failed to get assignments", details: error };
  }
};

export {
  add_New_Member,
  get_all_member,
  get_single_member,
  update_member,
  delete_member,
  get_members_by_category,
  get_member_assignments
};
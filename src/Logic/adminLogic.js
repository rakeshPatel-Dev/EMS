import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../database/firebase";

// Add a new task
export const createTask = async (task) => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), task);
    return docRef;
  } catch (err) {
    console.error("Error creating task:", err);
    throw err;
  }
};

// Add a new user
export const addUser = async (user) => {
  try {
    const docRef = await addDoc(collection(db, "users"), user);
    return docRef;
  } catch (err) {
    console.error("Error adding user:", err);
    throw err;
  }
};

// Get all users
export const fetchUsers = async () => {
  try {
    const snapshot = await getDocs(collection(db, "users"));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("Error fetching users:", err);
    return [];
  }
};

// Get the last task ID in T001 format
export const fetchLastTaskId = async () => {
  try {
    const snapshot = await getDocs(collection(db, "tasks"));
    const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    if (tasks.length === 0) return "T000"; // start from T001 if no tasks

    // Extract numeric part from taskId like T001 → 1
    const maxNum = tasks
      .map(t => {
        const num = t.taskId ? parseInt(t.taskId.replace(/^T/, ""), 10) : 0;
        return isNaN(num) ? 0 : num;
      })
      .reduce((a, b) => Math.max(a, b), 0);

    // Return as string with T prefix and padded zeros
    return `T${String(maxNum).padStart(3, "0")}`;
  } catch (err) {
    console.error("Error fetching last task ID:", err);
    return "T000";
  }
};

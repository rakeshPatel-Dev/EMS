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

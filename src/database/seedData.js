import { db } from "./firebase";
import { tasks } from "../data/taskData";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";


export async function seedTasks() {
  try {
    for (const task of tasks) {
      await setDoc(doc(db, "tasks", task.id), {
        title: task.title,
        description: task.description,
        assignedTo: task.assignedTo,
        priority: task.priority,
        dueDate: task.dueDate,
        status: task.status,
        createdAt: task.createdAt
      });
    }

    console.log("All tasks uploaded successfully!");
    toast.success("data added sucessfully!")
  } catch (err) {
    console.error("Error adding tasks:", err);
    toast.error("failed to store data");
  }
}


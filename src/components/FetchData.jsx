import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../database/firebase";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const snapshot = await getDocs(collection(db, "tasks"));
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(list);
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Tasks</h1>
      {tasks.map(task => (
        <div key={task.id} className="border p-4 my-2 rounded">
          <h2 className="font-bold">{task.title}</h2>
          <p>{task.description}</p>
          <p>Assigned to: {task.assignedTo}</p>
          <p>Priority: {task.priority}</p>
          <p>Status: {task.status}</p>
          <p>Due: {task.dueDate}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;

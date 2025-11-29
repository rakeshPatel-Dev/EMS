import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { createTask, addUser, fetchUsers, fetchLastTaskId } from "../Logic/adminLogic";

const AdminPage = ({ handleLogout, currentUser }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("task");

  // Users state
  const [users, setUsers] = useState([]);

  // Task form state
  const [taskId, setTaskId] = useState(""); // manual ID input
  const [lastTaskId, setLastTaskId] = useState(""); // show last ID
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("urgent");
  const [status, setStatus] = useState("pending");

  // User form state
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRole, setUserRole] = useState("employee");
  const [userIsAdmin, setUserIsAdmin] = useState(false);

  // Load users for dropdown
  const loadUsers = async () => {
    const fetchedUsers = await fetchUsers();
    setUsers(fetchedUsers);
  };

  // Load last task ID
  const loadLastTaskId = async () => {
    const lastId = await fetchLastTaskId(); // e.g., "T005"
    setLastTaskId(lastId);
  };

  useEffect(() => {
    loadUsers();
    loadLastTaskId();
  }, []);

  const handleCreateTask = async () => {
    if (!taskName || !assignTo) {
      alert("Task name and assignee are required");
      return;
    }

    // Generate new task ID if not entered manually
    let newTaskId;
    if (taskId) {
      newTaskId = taskId;
    } else {
      const lastNum = parseInt(lastTaskId.replace(/^T/, ""), 10);
      const nextNum = lastNum + 1;
      newTaskId = `T${String(nextNum).padStart(3, "0")}`;
    }

    const task = { taskId: newTaskId, taskName, description, assignTo, dueDate, priority, status };

    try {
      await createTask(task);
      alert(`Task ${newTaskId} created successfully!`);

      // Reset form
      setTaskId("");
      setTaskName("");
      setDescription("");
      setAssignTo("");
      setDueDate("");
      setPriority("urgent");
      setStatus("pending");
      setLastTaskId(newTaskId);
    } catch {
      alert("Error creating task");
    }
  };

  const handleAddUser = async () => {
    if (!userName || !userEmail || !userPassword) {
      alert("Name, email and password are required");
      return;
    }

    const user = { name: userName, email: userEmail, password: userPassword, role: userRole, isAdmin: userIsAdmin };

    try {
      await addUser(user);
      alert("User added successfully!");
      setUserName(""); setUserEmail(""); setUserPassword(""); setUserRole("employee"); setUserIsAdmin(false);
      loadUsers();
    } catch {
      alert("Error adding user");
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#102218] p-6">
      <Header onLogout={handleLogout} />

      {/* Welcome */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#102218] dark:text-white">
            Welcome {currentUser?.name} 👋
          </h1>
          <p className="text-neutral-text dark:text-[#13ec80]/80 mt-1">
            Manage tasks and users from your dashboard.
          </p>
        </div>
        <button
          onClick={() => navigate("/employee")}
          className="mt-4 md:mt-0 px-4 py-2 bg-[#13ec80] text-[#102218] rounded-lg font-semibold hover:bg-[#13ec80]/90 transition"
        >
          Go to Employee Page
        </button>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-neutral-border dark:border-neutral-border/20 mb-6">
        <button
          className={`px-4 py-2 font-semibold ${activeTab === "task" ? "border-b-2 border-[#13ec80] text-[#13ec80]" : "text-neutral-text dark:text-white/70"}`}
          onClick={() => setActiveTab("task")}
        >
          Add Task
        </button>
        <button
          className={`ml-4 px-4 py-2 font-semibold ${activeTab === "user" ? "border-b-2 border-[#13ec80] text-[#13ec80]" : "text-neutral-text dark:text-white/70"}`}
          onClick={() => setActiveTab("user")}
        >
          Add User
        </button>
      </div>

      {/* Task Form */}
      {activeTab === "task" && (
        <div className="p-6 bg-white dark:bg-[#102219] rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-[#102218] dark:text-white mb-2">Create Task</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Last Task ID: {lastTaskId}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Task ID (optional)" value={taskId} onChange={(e) => setTaskId(e.target.value)} className="p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-[#13ec80] dark:bg-[#102218]/50 dark:border-neutral-border/30 dark:text-white" />
            <input placeholder="Task Name" value={taskName} onChange={(e) => setTaskName(e.target.value)} className="p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-[#13ec80] dark:bg-[#102218]/50 dark:border-neutral-border/30 dark:text-white" />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="p-3 border rounded-xl shadow-sm md:col-span-2 focus:ring-2 focus:ring-[#13ec80] dark:bg-[#102218]/50 dark:border-neutral-border/30 dark:text-white" />
            <select value={assignTo} onChange={(e) => setAssignTo(e.target.value)} className="p-3 border rounded-xl shadow-sm dark:bg-[#102218]/50 dark:border-neutral-border/30 dark:text-white">
              <option value="">Select User</option>
              {users.map((u) => <option key={u.id} value={u.name}>{u.name}</option>)}
            </select>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="p-3 border rounded-xl shadow-sm dark:bg-[#102218]/50 dark:border-neutral-border/30 dark:text-white" />

            {/* Priority Radio */}
            <div className="flex items-center gap-2">
              <span className="font-medium dark:text-white">Priority:</span>
              {["low", "medium", "high", "urgent"].map((p) => (
                <label key={p} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="priority" value={p} checked={priority === p} onChange={() => setPriority(p)} className="hidden" />
                  <span className={`px-3 py-1 rounded-full text-white font-semibold ${priority === p ? "bg-[#13ec80]" : "bg-gray-300 dark:bg-gray-700/40"}`}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </span>
                </label>
              ))}
            </div>

            {/* Status dropdown */}
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="p-3 border rounded-xl shadow-sm dark:bg-[#102218]/50 dark:border-neutral-border/30 dark:text-white">
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <button onClick={handleCreateTask} className="col-span-2 bg-[#13ec80] text-[#102218] py-2 rounded-lg font-semibold hover:bg-[#13ec80]/90 transition">Create Task</button>
          </div>
        </div>
      )}

      {/* User Form */}
      {activeTab === "user" && (
        <div className="p-6 bg-white dark:bg-[#102219] rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-[#102218] dark:text-white mb-4">Add User</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Name" value={userName} onChange={(e) => setUserName(e.target.value)} className="p-3 border rounded-xl shadow-sm dark:bg-[#102218]/50 dark:border-neutral-border/30 dark:text-white" />
            <input placeholder="Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="p-3 border rounded-xl shadow-sm dark:bg-[#102218]/50 dark:border-neutral-border/30 dark:text-white" />
            <input placeholder="Password" type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} className="p-3 border rounded-xl shadow-sm dark:bg-[#102218]/50 dark:border-neutral-border/30 dark:text-white" />
            <select value={userRole} onChange={(e) => setUserRole(e.target.value)} className="p-3 border rounded-xl shadow-sm dark:bg-[#102218]/50 dark:border-neutral-border/30 dark:text-white">
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={userIsAdmin} onChange={() => setUserIsAdmin(!userIsAdmin)} />
              <span className="text-neutral-text dark:text-white">Is Admin</span>
            </label>
            <button onClick={handleAddUser} className="col-span-2 bg-[#13ec80] text-[#102218] py-2 rounded-lg font-semibold hover:bg-[#13ec80]/90 transition">Add User</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;

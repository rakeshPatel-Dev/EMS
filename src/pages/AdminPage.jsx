import React, { useEffect, useState } from "react";
import { createTask, addUser, fetchUsers } from "../logic/adminLogic";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const AdminPage = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("task");

  // Users state for dropdown
  const [users, setUsers] = useState([]);

  // Task form state
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("urgent");

  // User form state
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRole, setUserRole] = useState("employee");
  const [userIsAdmin, setUserIsAdmin] = useState(false);

  // Fetch users for Assign To dropdown
  const loadUsers = async () => {
    const fetchedUsers = await fetchUsers();
    setUsers(fetchedUsers);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateTask = async () => {
    if (!taskName || !assignTo) {
      alert("Task name and assignee are required");
      return;
    }
    const task = { taskName, description, assignTo, dueDate, priority };
    try {
      await createTask(task);
      alert("Task created successfully!");
      setTaskName(""); setDescription(""); setAssignTo(""); setDueDate(""); setPriority("urgent");
    } catch (err) {
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
      loadUsers(); // Refresh assignTo list
    } catch (err) {
      alert("Error adding user");
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#102218] p-6">
      <Header />
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#102218] dark:text-white">
            Welcome Admin 👋
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

      {/* Content */}
      <div className="space-y-6">
        {activeTab === "task" && (
          <div className="p-6 bg-white dark:bg-[#102219] rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-[#102218] dark:text-white mb-4">Create Task</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input placeholder="Task Name" value={taskName} onChange={(e) => setTaskName(e.target.value)} className="p-3 border rounded-lg dark:bg-[#102218]/50 dark:border-neutral-border/30 dark:text-white" />
              <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="p-3 border rounded-lg md:col-span-2 dark:bg-[#102218]/50 dark:border-neutral-border/30 dark:text-white" />
              <select value={assignTo} onChange={(e) => setAssignTo(e.target.value)} className="p-3 border rounded-lg dark:bg-[#102218]/50 dark:border-neutral-border/30 dark:text-white">
                <option value="">Select User</option>
                {users.map(u => (
                  <option key={u.id} value={u.name}>{u.name}</option>
                ))}
              </select>
              <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="p-3 border rounded-lg dark:bg-[#102218]/50 dark:border-neutral-border/30 dark:text-white" />
              <select value={priority} onChange={(e) => setPriority(e.target.value)} className="p-3 border rounded-lg dark:bg-[#102218]/50 dark:border-neutral-border/30 dark:text-white">
                {["Low", "Medium", "High", "Urgent"].map(p => <option key={p} value={p.toLowerCase()}>{p}</option>)}
              </select>
              <button onClick={handleCreateTask} className="col-span-2 bg-[#13ec80] text-[#102218] py-2 rounded-lg font-semibold hover:bg-[#13ec80]/90 transition">Create Task</button>
            </div>
          </div>
        )}

        {activeTab === "user" && (
          <div className="p-6 bg-white dark:bg-[#102219] rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-[#102218] dark:text-white mb-4">Add User</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input placeholder="Name" value={userName} onChange={(e) => setUserName(e.target.value)} className="p-3 border rounded-lg dark:bg-[#102218]/50 dark:border-neutral-border/30 dark:text-white" />
              <input placeholder="Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="p-3 border rounded-lg dark:bg-[#102218]/50 dark:border-neutral-border/30 dark:text-white" />
              <input placeholder="Password" type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} className="p-3 border rounded-lg dark:bg-[#102218]/50 dark:border-neutral-border/30 dark:text-white" />
              <select value={userRole} onChange={(e) => setUserRole(e.target.value)} className="p-3 border rounded-lg dark:bg-[#102218]/50 dark:border-neutral-border/30 dark:text-white">
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
    </div>
  );
};

export default AdminPage;

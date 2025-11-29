import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import Header from "../components/Header";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../database/firebase";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// Color mappings
const statusColors = {
  pending: "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-300",
  "in-progress": "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300",
  completed: "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300",
  "on-hold": "bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-300",
};

const priorityColors = {
  high: "text-red-500 dark:text-red-400",
  medium: "text-yellow-500 dark:text-yellow-400",
  low: "text-gray-400 dark:text-gray-500",
  urgent: "text-purple-600 dark:text-purple-400",
};

const EmployeePage = () => {
  const [tasks, setTasks] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mobileTask, setMobileTask] = useState(null); // For mobile tap modal

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      const snapshot = await getDocs(collection(db, "tasks"));
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTasks(list);
    };
    fetchTasks();
  }, []);

  // Update window width for mobile detection
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    return (
      (filterStatus ? task.status === filterStatus : true) &&
      (filterPriority ? task.priority === filterPriority : true)
    );
  });

  const statuses = [...new Set(tasks.map((t) => t.status).filter(Boolean))];
  const priorities = [...new Set(tasks.map((t) => t.priority))];

  // Status counts including "No Category"
  const statusCounts = {};
  statuses.forEach((status) => {
    statusCounts[status] = tasks.filter((t) => t.status === status).length;
  });
  const noCategoryCount = tasks.filter((t) => !t.status).length;

  // Drag End Handler
  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    const newStatus = destination.droppableId;

    const updatedTasks = tasks.map((task) => {
      if (task.id === draggableId) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTasks(updatedTasks);

    // Update Firestore
    const taskDoc = doc(db, "tasks", draggableId);
    await updateDoc(taskDoc, { status: newStatus });
  };

  // Mobile status change
  const changeStatusMobile = async (task, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t))
    );
    const taskDoc = doc(db, "tasks", task.id);
    await updateDoc(taskDoc, { status: newStatus });
    setMobileTask(null);
  };

  return (
    <div className="font-display bg-[#f6f8f7] dark:bg-[#102218] text-[#0d1b14] dark:text-gray-200 px-6 min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h1 className="text-3xl font-black">All Tasks</h1>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Status Filter */}
              <div className="border border-white/10 rounded-md px-4 py-2 bg-[#13ec6d]/20 dark:bg-[#13ec6d]/10">
                <label className="text-sm font-bold border-r-2 dark:border-white/50 pr-2" htmlFor="statusFilter">Status</label>
                <select
                  name="status"
                  id="statusFilter"
                  className="dark:bg-[#103721] outline-none text-sm pl-2 capitalize"
                  onChange={(e) => setFilterStatus(e.target.value)}
                  value={filterStatus}
                >
                  <option value="">All</option>
                  {statuses.map((status, idx) => (
                    <option key={idx} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Priority Filter */}
              <div className="border border-white/10 rounded-md px-4 py-2 bg-[#13ec6d]/20 dark:bg-[#13ec6d]/10">
                <label className="text-sm font-bold border-r-2 dark:border-white/50 pr-2" htmlFor="priorityFilter">Priority</label>
                <select
                  name="priority"
                  id="priorityFilter"
                  className="dark:bg-[#103721] outline-none text-sm pl-2 capitalize"
                  onChange={(e) => setFilterPriority(e.target.value)}
                  value={filterPriority}
                >
                  <option value="">All</option>
                  {priorities.map((priority, idx) => (
                    <option key={idx} value={priority}>{priority}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Status Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {statuses.map((status) => (
              <div key={status} className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-md ${statusColors[status] || "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"}`}>
                <span className="text-4xl font-bold">{statusCounts[status]}</span>
                <span className="text-lg capitalize">{status}</span>
              </div>
            ))}
            {noCategoryCount > 0 && (
              <div className="flex flex-col items-center justify-center p-4 rounded-lg shadow-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                <span className="text-lg font-bold">{noCategoryCount}</span>
                <span className="text-sm">No Category</span>
              </div>
            )}
          </div>

          {/* Kanban Board */}
          {windowWidth > 768 ? (
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 capitalize">
                {statuses.map((col) => {
                  const colTasks = filteredTasks.filter((t) => t.status === col);
                  return (
                    <Droppable droppableId={col} key={col}>
                      {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col gap-4">
                          <div className="flex justify-between items-center px-2">
                            <h3 className="text-lg font-bold">{col}</h3>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{colTasks.length}</span>
                          </div>

                          {colTasks.map((task, idx) => (
                            <Draggable key={task.id} draggableId={task.id} index={idx}>
                              {(provided) => (
                                <div
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                  className="bg-white dark:bg-[#102218]/60 rounded-xl p-4 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg hover:border-[#13ec6d]/50 transition-all cursor-pointer select-none"
                                >
                                  {/* Card content */}
                                  <div className="flex justify-between items-start mb-3">
                                    <p className="text-sm font-bold text-[#13ec6d]">{task.id}</p>
                                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${statusColors[task.status] || ""}`}>
                                      {task.status}
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-2">
                                    <h4 className="text-base font-semibold">{task.title}</h4>
                                    <p className="text-xs font-mono text-gray-600 dark:text-gray-400 mb-4">{task.description}</p>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                      <div className="w-8 h-8 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(https://i.pravatar.cc/150?u=${task.assignedTo})` }} />
                                      <div className={`flex items-center gap-1 ${priorityColors[task.priority] || ""}`}>
                                        <Star size={16} fill="currentColor" />
                                        <span className="text-sm font-medium">{task.priority}</span>
                                      </div>
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{task.dueDate || "No date"}</p>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  );
                })}
              </div>
            </DragDropContext>
          ) : (
            // Mobile: same cards, tap to change status
            <div className="grid grid-cols-1 gap-6 capitalize">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white dark:bg-[#102218]/60 rounded-xl p-4 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg hover:border-[#13ec6d]/50 transition-all cursor-pointer select-none"
                  onClick={() => setMobileTask(task)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <p className="text-sm font-bold text-[#13ec6d]">{task.id}</p>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${statusColors[task.status] || ""}`}>
                      {task.status}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-base font-semibold">{task.title}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">{task.description}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(https://i.pravatar.cc/150?u=${task.assignedTo})` }} />
                      <div className={`flex items-center gap-1 ${priorityColors[task.priority] || ""}`}>
                        <Star size={16} fill="currentColor" />
                        <span className="text-sm font-medium">{task.priority}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{task.dueDate || "No date"}</p>
                  </div>
                </div>
              ))}

              {/* Mobile status modal */}
              {mobileTask && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white dark:bg-[#102218] rounded-lg p-6 w-80">
                    <h3 className="text-lg font-bold mb-4">{mobileTask.title}</h3>
                    <p className="mb-4">{mobileTask.description}</p>
                    <h4 className="font-semibold mb-2">Change Status</h4>
                    <div className="flex flex-col gap-2">
                      {statuses.map((status) => (
                        <button
                          key={status}
                          onClick={() => changeStatusMobile(mobileTask, status)}
                          className={`px-4 py-2 rounded ${statusColors[status]}`}
                        >
                          {status}
                        </button>
                      ))}
                      <button
                        onClick={() => setMobileTask(null)}
                        className="mt-2 px-4 py-2 rounded border dark:border-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EmployeePage;

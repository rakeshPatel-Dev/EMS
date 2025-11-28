import React from "react";
import {
  Star,
  Filter,
  ChevronDown,
  ArrowUp,
} from "lucide-react";
import Header from "../components/Header";

const tasksData = [
  {
    id: "TASK-004",
    title: "Review Refrigeration Logs",
    status: "To Do",
    priority: "Medium",
    assignee: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpNLtskEmS1PxaKBHUdGw9KufxmlSNTKbNqvel03hNYTD8DtVF2IWAvip193J75WIeJzn7t_s4sNIEa7l_cXAiCEXDIRX-2NdXBJ_6Ml9fOUN6PBdK9RGwTOVF-Y0WCO0BBvNlIEwmHL4mqbQiBxBCz6WVHi3pVE1FbbYzadyIFsRmbJ1e535BYda8cBgCZQMRUvChlud1eaISci1cwoHrkK52wZt5c8ROL7EeyGyEneXUj3CKe8er80HlmtCtQlXQ_WRhQbqB60lX",
    date: "Oct 28",
    bgColor: "blue",
  },
  {
    id: "TASK-006",
    title: "Quarterly Safety Drill Planning",
    status: "In Progress",
    priority: "Low",
    assignee: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkoqQrriBu3UviX61bsyB1N87CEzuc1WMuNdt_2gQcrUokKeiRFw0JlTY0x1JFmeKgupAUmvxuzsKvGs3cjUgjeqTikQD8SBYGflT9_NVFOOogZbBe9YsIRAMrTtZLgbuSCPM3EKd87M1UlCTE-VmFAX0weD7TJMnzqw_ouoJ-dGInKuZI-2qHPwBLEV4BspRLSZVM3mG0MQfNbbstK0y4HMeP2avbqPC5shBYHf7OHtG-7Lu3DN8F1chW-fAHJsDK24HD0dr_ek-x",
    date: "Nov 01",
    bgColor: "orange",
  },
  {
    id: "TASK-006",
    title: "Quarterly Safety Drill Planning",
    status: "Pending",
    priority: "High",
    assignee: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkoqQrriBu3UviX61bsyB1N87CEzuc1WMuNdt_2gQcrUokKeiRFw0JlTY0x1JFmeKgupAUmvxuzsKvGs3cjUgjeqTikQD8SBYGflT9_NVFOOogZbBe9YsIRAMrTtZLgbuSCPM3EKd87M1UlCTE-VmFAX0weD7TJMnzqw_ouoJ-dGInKuZI-2qHPwBLEV4BspRLSZVM3mG0MQfNbbstK0y4HMeP2avbqPC5shBYHf7OHtG-7Lu3DN8F1chW-fAHJsDK24HD0dr_ek-x",
    date: "Nov 01",
    bgColor: "gray",
  },
  {
    id: "TASK-006",
    title: "Quarterly Safety Drill Planning",
    status: "Completed",
    priority: "High",
    assignee: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkoqQrriBu3UviX61bsyB1N87CEzuc1WMuNdt_2gQcrUokKeiRFw0JlTY0x1JFmeKgupAUmvxuzsKvGs3cjUgjeqTikQD8SBYGflT9_NVFOOogZbBe9YsIRAMrTtZLgbuSCPM3EKd87M1UlCTE-VmFAX0weD7TJMnzqw_ouoJ-dGInKuZI-2qHPwBLEV4BspRLSZVM3mG0MQfNbbstK0y4HMeP2avbqPC5shBYHf7OHtG-7Lu3DN8F1chW-fAHJsDK24HD0dr_ek-x",
    date: "Nov 01",
    bgColor: "green",
  },
  // Add remaining tasks here...
];

const EmployeePage = () => {
  return (
    <div className="font-display bg-[#f6f8f7] dark:bg-[#102218] text-[#0d1b14] dark:text-gray-200 px-6 min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h1 className="text-3xl font-black">All Tasks</h1>
            <div className="flex items-center gap-2 flex-wrap">
              {["Status", "Assignee", "Priority"].map((filter) => (
                <button
                  key={filter}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg bg-[#13ec6d]/20 dark:bg-[#13ec6d]/30 text-sm font-medium"
                >
                  {filter} <ChevronDown size={16} />
                </button>
              ))}
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2" />
              <Filter size={20} className="text-[#0d1b14] dark:text-white" />
              <ArrowUp size={20} className="text-[#0d1b14] dark:text-white" />
            </div>
          </div>

          {/* Kanban Board */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["To Do", "In Progress", "Pending", "Completed"].map((col) => {
              const colTasks = tasksData.filter((t) => t.status === col);
              return (
                <div key={col} className="flex flex-col gap-4">
                  <div className="flex justify-between items-center px-2">
                    <h3 className="text-lg font-bold">{col}</h3>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {colTasks.length}
                    </span>
                  </div>
                  <div className="flex flex-col gap-4">
                    {colTasks.map((task) => (
                      <div
                        key={task.id}
                        className="bg-white dark:bg-[#102218]/60 rounded-xl p-4 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-lg hover:border-[#13ec6d]/50 transition-all cursor-pointer"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <p className="text-sm font-bold text-[#13ec6d]">
                            {task.id}
                          </p>
                          <div
                            className={`flex items-center gap-1 px-2 py-1 rounded-full ${task.bgColor === "blue"
                              ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300"
                              : task.bgColor === "orange"
                                ? "bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-300"
                                : task.bgColor === "green"
                                  ? "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300"
                                  : "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300"
                              } text-xs font-semibold`}
                          >
                            {task.status}
                          </div>
                        </div>
                        <h4 className="text-base font-semibold mb-4">
                          {task.title}
                        </h4>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-8 h-8 rounded-full bg-cover bg-center"
                              style={{ backgroundImage: `url(${task.assignee})` }}
                            />
                            <div
                              className={`flex items-center gap-1 ${task.priority === "High"
                                ? "text-red-500 dark:text-red-400"
                                : task.priority === "Medium"
                                  ? "text-yellow-500 dark:text-yellow-400"
                                  : "text-gray-400 dark:text-gray-500"
                                }`}
                            >
                              <Star size={16} fill="currentColor" />
                              <span className="text-sm font-medium">
                                {task.priority}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {task.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeePage;

import React from "react";

const AdminPage = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#f6f6f8] dark:bg-[#102219] overflow-x-hidden">
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap gap-2 text-sm text-[#13ec80]/80 dark:text-[#13ec80]/90 font-medium">
            <a href="#" className="hover:underline">Dashboard</a>
            <span>/</span>
            <a href="#" className="hover:underline">Tasks</a>
            <span>/</span>
            <span className="text-neutral-text dark:text-white">Create Task</span>
          </div>

          {/* Page Heading */}
          <div className="mt-6 flex flex-wrap justify-between gap-3">
            <div className="flex flex-col gap-2 min-w-72">
              <h1 className="text-neutral-text dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                Create New Task
              </h1>
              <p className="text-neutral-text/70 dark:text-white/70 text-base font-normal">
                Fill in the details below to assign a new task.
              </p>
            </div>
          </div>

          {/* Form Container */}
          <div className="mt-8 rounded-xl border border-neutral-border bg-white dark:bg-[#102219] dark:border-neutral-border/20 p-6 md:p-8">
            <form className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Left Column */}
              <div className="flex flex-col gap-6">
                <label className="flex flex-col">
                  <p className="text-neutral-text dark:text-white text-base font-medium pb-2">Task Name</p>
                  <input
                    type="text"
                    placeholder="Enter a brief, clear task name"
                    className="form-input w-full rounded-lg border border-neutral-border bg-[#f6f6f8] dark:bg-[#102219] dark:border-neutral-border/30 text-neutral-text dark:text-white placeholder:text-neutral-text/50 dark:placeholder:text-white/50 focus:border-[#13ec80] focus:ring-2 focus:ring-[#13ec80]/20 h-12 p-3"
                  />
                </label>
                <label className="flex flex-col">
                  <p className="text-neutral-text dark:text-white text-base font-medium pb-2">Description</p>
                  <textarea
                    placeholder="Provide a detailed description of the task"
                    className="form-textarea w-full rounded-lg border border-neutral-border bg-[#f6f6f8] dark:bg-[#102219] dark:border-neutral-border/30 text-neutral-text dark:text-white placeholder:text-neutral-text/50 dark:placeholder:text-white/50 focus:border-[#13ec80] focus:ring-2 focus:ring-[#13ec80]/20 min-h-36 p-3"
                  />
                </label>
                <div>
                  <p className="text-neutral-text dark:text-white text-base font-medium pb-2">Attachments</p>
                  <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-neutral-border dark:border-neutral-border/30 bg-[#f6f6f8] dark:bg-[#102219]/50 p-6 text-center">
                    <span className="material-symbols-outlined text-4xl text-neutral-text/50 dark:text-white/50">cloud_upload</span>
                    <p className="mt-2 text-sm text-neutral-text dark:text-white">
                      <span className="font-semibold text-[#13ec80]">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-neutral-text/60 dark:text-white/60">PDF, PNG, JPG up to 10MB</p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-6">
                <label className="flex flex-col">
                  <p className="text-neutral-text dark:text-white text-base font-medium pb-2">Assign To</p>
                  <div className="relative">
                    <select className="form-select w-full appearance-none rounded-lg border border-neutral-border bg-[#f6f6f8] dark:bg-[#102219] dark:border-neutral-border/30 text-neutral-text dark:text-white focus:border-[#13ec80] focus:ring-2 focus:ring-[#13ec80]/20 h-12 p-3">
                      <option>Select a team member</option>
                      <option>John Doe</option>
                      <option>Jane Smith</option>
                      <option>Peter Jones</option>
                    </select>
                    <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-text/50 dark:text-white/50">expand_more</span>
                  </div>
                </label>
                <label className="flex flex-col">
                  <p className="text-neutral-text dark:text-white text-base font-medium pb-2">Due Date</p>
                  <input
                    type="date"
                    className="form-input w-full rounded-lg border border-neutral-border bg-[#f6f6f8] dark:bg-[#102219] dark:border-neutral-border/30 text-neutral-text dark:text-white placeholder:text-neutral-text/50 dark:placeholder:text-white/50 focus:border-[#13ec80] focus:ring-2 focus:ring-[#13ec80]/20 h-12 p-3"
                  />
                </label>
                <div>
                  <p className="text-neutral-text dark:text-white text-base font-medium pb-2">Priority</p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {["Low", "Medium", "High", "Urgent"].map((priority, idx) => (
                      <label key={idx} className="flex cursor-pointer items-center justify-center rounded-lg border border-neutral-border dark:border-neutral-border/30 px-3 py-2 text-sm font-medium">
                        <input type="radio" className="sr-only" name="priority" defaultValue={priority.toLowerCase()} defaultChecked={priority === "Urgent"} />
                        <span>{priority}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </form>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-end gap-4 border-t border-neutral-border dark:border-neutral-border/20 pt-6">
              <button className="rounded-lg px-6 py-3 text-base font-semibold text-neutral-text dark:text-white hover:bg-neutral-text/10 dark:hover:bg-white/10 transition-colors">
                Cancel
              </button>
              <button className="rounded-lg bg-[#13ec80] px-6 py-3 text-base font-semibold text-white hover:bg-[#13ec80]/90 transition-colors">
                Create Task
              </button>
            </div>

            {/* Demo Card */}
            <div className="mt-8 p-4 rounded-lg border border-neutral-border dark:border-neutral-border/30 bg-white dark:bg-[#102219]/50 shadow hover:shadow-lg transition cursor-pointer">
              <p className="text-xs md:text-sm font-bold text-[#13ec80]">DEMO TASK</p>
              <h4 className="text-sm md:text-base font-semibold mb-2">Demo Task Card</h4>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-300">
                This card shows a demo task for testing purposes.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;

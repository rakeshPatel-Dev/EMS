import React from "react";
import { Plus, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth info, redirect to login
    localStorage.removeItem("ems-user"); // example
    navigate("*");
    window.location.reload();
  };

  return (
    <header className="flex items-center justify-between border-b border-neutral-border dark:border-neutral-border/20 px-4 py-3 sticky top-0 bg-[#f6f6f8] dark:bg-[#102218]/80 backdrop-blur-sm z-10">
      {/* Logo + Navigation */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4 text-[#13ec6d]">
          <div className="w-8 h-8">
            <svg
              fill="currentColor"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold">Dairy EMS</h2>
        </div>

        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <a href="#" className="text-[#0d1b14] dark:text-white">Dashboard</a>
          <a href="#" className="text-gray-500 dark:text-gray-400">Tasks</a>
          <a href="#" className="text-gray-500 dark:text-gray-400">Reports</a>
          <a href="#" className="text-gray-500 dark:text-gray-400">Admin</a>
        </nav>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
        >
          <LogOut size={18} />
          <span className="hidden md:inline">Logout</span>
        </button>

        {/* Profile Avatar */}
        <div
          className="w-10 h-10 rounded-full bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCFxjCLwUxQNE1DIepdWPlyFt-BENnSERP_gxZF4h4RF6qFeBokDTHkuYefqFm2cKNohqbOpn2BaKeEa-gdzy8DXx3z9GhsmFSbPYC814Iy094Vqqu4p2w4i_ixhDDO4EWV1x3j_sjsfhV-AnvxdaUTAT7qXOO2d-f9eBHnbl3kIBDMg44gJ1KBaiBbFCiH0Krhmj0C1FWCr6FS4SxqLF6SzbjLGQ9j2Zn0oge7TcRK_OIOxqVnzApESkf4B74FGynmFvLN8ctndbVp")',
          }}
        />
      </div>
    </header>
  );
};

export default Header;

import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Users from "./context/Users";
import Login from "./auth/Login";
import AdminPage from "./pages/AdminPage";
import EmployeePage from "./pages/EmployeePage";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);


  // Restore user from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("ems-user");
    if (saved) {
      setCurrentUser(JSON.parse(saved));
    }
  }, []);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem("ems-user", JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("ems-user");
  };

  return (
    <Users>
      <ToastContainer />

      <Routes>
        {!currentUser && (
          <Route path="*" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        )}

        {currentUser?.isAdmin && (
          <>
            <Route path="/admin" element={<AdminPage currentUser={currentUser} onLogout={handleLogout} />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </>
        )}
        <Route path="/employee" element={<EmployeePage />} />

        {!currentUser?.isAdmin && currentUser && (
          <>
            <Route path="/employee" element={<EmployeePage onLogout={handleLogout} />} />
            <Route path="*" element={<Navigate to="/employee" replace />} />
          </>
        )}
      </Routes>
    </Users>
  );
};

export default App;

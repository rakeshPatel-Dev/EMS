import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Users from "./context/Users"; // your context provider
import Login from "./auth/Login";
import AdminPage from "./pages/AdminPage";
import EmployeePage from "./pages/EmployeePage";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
  };

  return (
    <Users>
      <ToastContainer />
      <Routes>
        {!currentUser && <Route path="*" element={<Login onLoginSuccess={handleLoginSuccess} />} />}
        {currentUser && currentUser.isAdmin && (
          <>
            <Route path="/admin" element={<AdminPage currentUser={currentUser} />} />
            <Route path="/employee" element={<EmployeePage />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </>
        )}
        {currentUser && !currentUser.isAdmin && (
          <>
            <Route path="/employee" element={<EmployeePage />} />
            <Route path="*" element={<Navigate to="/employee" replace />} />
          </>
        )}
      </Routes>
    </Users>
  );
};

export default App;

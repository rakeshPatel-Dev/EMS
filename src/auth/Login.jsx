import React, { useContext, useState } from "react";
import { UserContext } from "../context/Users";
import LoginCard from "../components/LoginCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../database/firebase";
import { toast } from "react-toastify";


const Login = ({ onLoginSuccess = () => { } }) => {

  const { email, password } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const loginUser = async (email, password) => {
    setLoading(true);

    try {
      const snap = await getDocs(collection(db, "users"));
      const users = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      return user || null;
    } catch (err) {
      console.error(err);
      toast.error("Login failed!");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    const user = await loginUser(email, password);

    if (!user) {
      toast.error("Invalid email or password");
      return;
    }

    // ✅ Store user in localStorage so they stay logged in
    localStorage.setItem("ems-user", JSON.stringify(user));

    toast.success(`Welcome ${user.name}!`);

    onLoginSuccess(user);
  };


  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };


  return <LoginCard handleKeyPress={handleKeyPress} handleLogin={handleLogin} loading={loading} />;
};

export default Login;

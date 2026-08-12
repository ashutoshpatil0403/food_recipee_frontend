import { useState } from "react";
import { AuthContext } from "./useAuth";
import axios from "axios";

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("user")
  );

  const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  const login = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

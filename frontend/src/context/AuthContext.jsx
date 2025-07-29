import { createContext, useState, useEffect } from "react";
// ✅ Correct
import { jwtDecode } from "jwt-decode";


export  const AuthContext = createContext();

export  const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    }
  }, [token]);

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

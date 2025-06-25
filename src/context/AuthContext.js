// // src/context/AuthContext.js
// import React, { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     const stored = localStorage.getItem("user");
//     return stored ? JSON.parse(stored) : null;
//   });

//   const login = (email, password) => {
//     if (email === "admin@netflix.com" && password === "1") {
//       const userData = { email };
//       setUser(userData);
//       localStorage.setItem("user", JSON.stringify(userData)); // ✅ persist
//     } else {
//       alert("Invalid credentials");
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user"); // ✅ clear
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email, password) => {
    if (email === "admin@netflix.com" && password === "1") {
      const userData = { email };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      alert("Invalid credentials");
    }
  };

  const loginAsGuest = (name) => {
    const guestUser = { email: `${name} (Guest)` };
    setUser(guestUser);
    localStorage.setItem("user", JSON.stringify(guestUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, loginAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

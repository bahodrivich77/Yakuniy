import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const USERS_KEY = "am_users";
const SESSION_KEY = "am_session";

const defaultUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@automarket.uz",
    password: "admin123",
    role: "admin",
    avatar: "👨‍💼",
    createdAt: "2024-01-01",
    phone: "+998 90 000 00 01",
  },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  });

  const getUsers = () => {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : defaultUsers;
  };

  const saveUsers = (users) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const login = (email, password) => {
    const users = getUsers();
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) return { success: false, message: "Email yoki parol noto'g'ri" };
    const { password: _, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
    return { success: true, user: safeUser };
  };

  const register = (name, email, password, phone) => {
    const users = getUsers();
    const exists = users.find((u) => u.email === email);
    if (exists) return { success: false, message: "Bu email allaqachon ro'yxatdan o'tgan" };
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      phone: phone || "",
      role: "user",
      avatar: "👤",
      createdAt: new Date().toISOString().split("T")[0],
    };
    saveUsers([...users, newUser]);
    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
    return { success: true, user: safeUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  };

  const updateProfile = (data) => {
    const users = getUsers();
    const updated = users.map((u) =>
      u.id === user.id ? { ...u, ...data } : u
    );
    saveUsers(updated);
    const newUser = { ...user, ...data };
    setUser(newUser);
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
  };

  const getAllUsers = () => {
    return getUsers().map(({ password: _, ...u }) => u);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, getAllUsers, isAdmin: user?.role === "admin" }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
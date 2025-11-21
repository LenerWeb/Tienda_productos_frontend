// src/context/AuthContext.js
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
   const [usuario, setUsuario] = useState(null);
   const [token, setToken] = useState(localStorage.getItem("token") || null);
   const [cargando, setCargando] = useState(true);

   const guardarToken = (t) => {
      if (t) {
         localStorage.setItem("token", t);
         setToken(t);
      } else {
         localStorage.removeItem("token");
         setToken(null);
      }
   };

   const login = (t, user) => {
      guardarToken(t);
      setUsuario(user);
   };

   const logout = () => {
      guardarToken(null);
      setUsuario(null);
   };

   // Verificar token al iniciar la app (auto-refresh / auto-verify)
   const verificar = async () => {
      const t = localStorage.getItem("token");
      if (!t) {
         setCargando(false);
         return;
      }
      try {
         const res = await fetch("/api/auth/verify", {
            headers: { Authorization: "Bearer " + t },
         });
         const data = await res.json();
         if (data?.valido) {
            setUsuario(data.usuario);
            setToken(t);
         } else {
            logout();
         }
      } catch {
         logout();
      } finally {
         setCargando(false);
      }
   };

   useEffect(() => { verificar(); }, []);

   return (
      <AuthContext.Provider value={{ usuario, token, cargando, login, logout, verificar }}>
         {children}
      </AuthContext.Provider>
   );
};



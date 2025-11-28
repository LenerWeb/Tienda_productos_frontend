import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

export default function ProtectedRoute({ children }) {
    const { usuario, cargando } = useAuth();
    // console.log("protectedroute", usuario)

    if (cargando) return <div>Cargando...</div>;
    if (!usuario) return <Navigate to="/login" replace />;
    if (children) return children;
    return <Outlet />;
}



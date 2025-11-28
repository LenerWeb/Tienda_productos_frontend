import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

export default function RoleRoute({ children, roles = []}) {
    const { usuario, cargando } = useAuth();
    console.log("roleroute", usuario)
    if (cargando) return <div>Cargando...</div>;
    if (!usuario) return <Navigate to="/login" replace />;
    if (!roles.includes(usuario.rol)) return <Navigate to="/403" replace />;
    if (children) return children;
    return <Outlet/>;
}

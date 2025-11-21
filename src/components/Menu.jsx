import React, { use } from "react";
import { Link } from "react-router-dom";
import useAuth from "../auth/useAuth";

export default function Menu() {
   const { usuario, logout } = useAuth();
   return (
      <nav style={{ padding: 12 }}>
         <Link to="/">Inicio</Link>{" | "}
         {usuario && (usuario.rol === "admin" || usuario.rol === "vendedor") && <><Link to="/ventas">Ventas</Link>{" | "}</>}
         {usuario && (usuario.rol === "admin" || usuario.rol === "almacen") && <><Link to="/compras">Compras</Link>{" | "}</>}
         <Link to="/productos">Productos</Link>{" | "}
         {usuario && usuario.rol === "admin" && <><Link to="/configuracion">Configuracion</Link>{" | "}<Link to="/usuarios">Usuarios</Link>{" | "}</>}
         {usuario ? <button onClick={logout}>Salir</button> : <Link to="/login">Login</Link>}
      </nav>
   );
}


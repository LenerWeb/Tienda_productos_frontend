import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../auth/ProtectedRoute";
import RoleRoute from "../auth/RoleRoute";

// Paginas
import Login from "../pages/Login";
import ChangePassword from "../pages/ChangePassword";
/* import Home from "../pages/Home"; */

// Usuarios
import UsuariosPage from "../pages/Usuarios/UsuariosPage";
import UsuarioForm from "../pages/Usuarios/UsuarioForm";
import UsuarioReset from "../pages/Usuarios/UsuarioReset";

// Productos
import ProductosPage from "../pages/Productos/ProductosPage";
import ProductosForm from "../pages/Productos/ProductosForm";

// Error
/* import Error403 from "../pages/Error403"; */

export default function AppRoutes() {
    return (
        <Routes>
            {/* Login publico */}
            <Route
                path="/login"
                element={<Login />} />

            {/* Cambio de contraseña */}
            <Route
                path="/change-password"
                element={

                    <ChangePassword />

                }
            />

            {/* Ruta protegida - requiere autenticacion */}
            <Route element={<ProtectedRoute />}>

                {/* HOME (Todos los roles pueden ingresar) */}
                {/* <Route path="/home" element={<Home />} /> */}

                {/* Ruta solo para administradores */}
                <Route element={<RoleRoute roles={["admin"]} />}>
                    {/* Usuarios */}
                    <Route path="/usuarios" element={<UsuariosPage />} />
                    <Route path="/usuarios/nuevo" element={<UsuarioForm />} />
                    <Route path="/usuarios/editar/:id" element={<UsuarioForm />} />
                    <Route path="/usuarios/reset/:id" element={<UsuarioReset />} />
                </Route>

                {/* PRODUCTOS */}
                <Route path="/productos" element={<ProductosPage />} />

                <Route
                    element={<RoleRoute roles={["admin", "almacen"]} />}
                >
                    <Route path="/productos/nuevo" element={<ProductosForm />} />
                    <Route path="/productos/editar/:id" element={<ProductosForm />} />
                </Route>

                {/* 🔜 Historial (futuro) */}
                {/* 
                    <Route path="/productos/historial/:id" element={<ProductosHistorial />} />
                */}

            </Route>

            {/* ERROR 403 */}
            {/* <Route path="/403" element={<Error403 />} /> */}

            {/* 404 (Opcional) */}
            {/* <Route path="*" element={<Error403/>}/> */}
        </Routes >
    );
}

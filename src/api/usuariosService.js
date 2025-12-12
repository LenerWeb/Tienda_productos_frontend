import { getToken } from "./apiClient";

const BASE_URL = "http://localhost:4000/api/usuarios";

const authHeaders = () => ({
  Authorization: "Bearer " + getToken(),
});

// LISTAR
export const listarUsuarios = async () => {
  const res = await fetch(`${BASE_URL}/`, { 
    headers: authHeaders(),
  });

  return await res.json();
};


// OBTENER POR ID
export const obtenerUsuario = async (id_usuario) => {
  const res = await fetch(`${BASE_URL}/${id_usuario}`, {
    headers: authHeaders(),
  });

  if (!res.ok) throw new Error("Error obteniendo usuario");
  return await res.json();
};


// CREAR
export const crearUsuario = async (usuarioData) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(usuarioData), // { nombre, usuario, contrasena, rol }
  });

  if (!res.ok) throw new Error("Error creando usuario");
  return await res.json();
};


// ACTUALIZAR
export const actualizarUsuario = async (id_usuario, usuarioData) => {
  const res = await fetch(`${BASE_URL}/${id_usuario}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(usuarioData),
  });

  if (!res.ok) throw new Error("Error actualizando usuario");
  return await res.json();
};


// RESET PASSWORD
//  *** ESTA ES LA PARTE CRÍTICA ***
export const resetPassword = async (id_usuario, password) => {
  const res = await fetch(`${BASE_URL}/reset/${id_usuario}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ password }),   // 🔥 CORREGIDO AQUÍ
  });

  if (!res.ok) throw new Error("Error reseteando contraseña");
  return await res.json();
};


// CAMBIAR ESTADO
// Activar o desactivar usuario
export const desactivarUsuario = async (id_usuario, estado) => {
  const res = await fetch(`${BASE_URL}/desactivar/${id_usuario}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ estado }),
  });

  if (!res.ok) throw new Error("Error cambiando estado del ususario");
  return await res.json();
};

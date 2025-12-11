import { getToken } from "./apiClient";

const API = "/api/usuarios";

const authHeaders = () => ({
  Authorization: "Bearer " + getToken(),
});


// LISTAR
export const listarUsuarios = async () => {
  const res = await fetch(`${API}`, { headers: authHeaders() });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Error listando usuarios");
  }

  return data;
};


// OBTENER POR ID
export const obtenerUsuario = async (id_usuario) => {
  const res = await fetch(`${API}/${id_usuario}`, {
    headers: authHeaders(),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Error obteniendo usuario");
  }

  return data;
};


// CREAR
export const crearUsuario = async (usuarioData) => {
  const res = await fetch(`${API}/nuevo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders()
    },
    body: JSON.stringify(usuarioData), // { nombre, usuario, contrasena, rol }
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Error creando usuario");
  }

  return data;
};


// ACTUALIZAR
export const actualizarUsuario = async (id_usuario, usuarioData) => {
  const res = await fetch(`${API}/editar/${id_usuario}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(usuarioData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message ||"Error actualizando usuario");
  }

  return data;
};


// RESET PASSWORD
//  *** ESTA ES LA PARTE CRÍTICA ***
export const resetPassword = async (id_usuario, contrasena) => {
  const res = await fetch(`${API}/reset/${id_usuario}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ contrasena }),   // 🔥 CORREGIDO AQUÍ
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Error reseteando contraseña");
  }

  return data;
};


// CAMBIAR ESTADO
// Activar o desactivar usuario
export const desactivarUsuario = async (id_usuario, estado) => {
  const res = await fetch(`${API}/estado/${id_usuario}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ estado }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message ||"Error cambiando estado del ususario");
  }

  return data;
};

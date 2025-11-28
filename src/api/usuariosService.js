import { getToken } from './apiClient';

const API = "/api/usuarios";

const authHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const listarUsuarios = async () => {
  const res = await fetch(`${API}`, { headers: { ...authHeaders() } });
  console.log("listarUsuarios", res);
  if (!res.ok) throw new Error("Error listando usuarios");
  return await res.json();
};

export const obtenerUsuario = async (id) => {
  const res = await fetch(`${API}/${id}`, { headers: { ...authHeaders() } });
  if (!res.ok) throw new Error("Usuario no encontrado");
  return await res.json();
};

export const crearUsuario = async (payload) => {
  const res = await fetch(`${API}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error creando usuario");
  return await res.json();
};

export const actualizarUsuario = async (id, payload) => {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Error actualizando usuario");
  return await res.json();
};

export const desactivarUsuario = async (id) => {
  const res = await fetch(`${API}/desactivar/${id}`, {
    method: "PUT",
    headers: { ...authHeaders() },
  });
  if (!res.ok) throw new Error("Error desactivando usuario");
  return await res.json();
};

export const resetPassword = async (id, nuevaContrasena) => {
  const res = await fetch(`${API}/reset/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify({ password: nuevaContrasena }),
  });
  if (!res.ok) throw new Error("Error reset contraseña");
  return await res.json();
};


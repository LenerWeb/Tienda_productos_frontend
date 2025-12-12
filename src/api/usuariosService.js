import { apiGet, apiPost, apiPut } from "./apiClient";


// LISTAR
export const listarUsuarios = () => apiGet("/api/usuarios/");


// OBTENER POR ID
export const obtenerUsuario = (id_usuario) => 
  apiGet(`/api/usuarios/${id_usuario}`);


// CREAR
export const crearUsuario = (usuarioData) => 
  apiPost("/api/usuarios/register", usuarioData);


// ACTUALIZAR
export const actualizarUsuario = (id_usuario, usuarioData) => 
  apiPut(`/api/usuarios/${id_usuario}`, usuarioData);


// RESET PASSWORD
export const resetPassword = (id_usuario, password) => 
  apiPost(`/api/usuarios/reset/${id_usuario}`, { password });


// CAMBIAR ESTADO
// Activar o desactivar usuario
export const desactivarUsuario = (id_usuario, estado) => 
  apiPut(`/api/usuarios/desactivar/${id_usuario}`, { estado});

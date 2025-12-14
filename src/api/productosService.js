import { apiGet, apiPost, apiPut, apiDelete } from "./apiClient";

// 🔹 Listar productos
export const obtenerProductos = async () => {
    return await apiGet("/api/productos");
};

// 🔹 Obtener producto por id
export const obtenerProducto = async (id) => {
    return await apiGet(`/api/productos/${id}`);
};

// 🔹 Crear producto
export const crearProducto = async (data) => {
    return await apiPost("/api/productos", data);
};

// 🔹 Actualizar producto
export const actualizarProducto = async (id, data) => {
    return await apiPut(`/api/productos/${id}`, data);
};

// 🔹 Eliminar producto
export const eliminarProducto = async (id) => {
    return await apiDelete(`/api/productos/${id}`);
};

import { apiGet } from "./apiClient";

// Listar compras
export const listarCompras = () => {
    return apiGet("/api/compras");
};

// Obtener compra por ID (cabecera + detalle)
export const obtenerCompra = (id_compra) => {
    return apiGet(`/api/compras/${id_compra}`);
};

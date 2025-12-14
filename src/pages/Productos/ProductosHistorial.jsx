import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    obtenerHistorialComprasProducto,
    obtenerHistorialVentasProducto
} from "../../api/productosService";
import { msgError } from "../../utils/alert";

export default function ProductosHistorial() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [compras, setCompras] = useState([]);
    const [ventas, setVentas] = useState([]);

    useEffect(() => {
        cargarHistorial();
    }, [id]);

    const cargarHistorial = async () => {
        try {
            const [c, v] = await Promise.all([
                obtenerHistorialComprasProducto(id),
                obtenerHistorialVentasProducto(id),
            ]);
            setCompras(c);
            setVentas(v);
        } catch (err) {
            msgError("Error", err.message);
            console.log("cargar historial", err);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Historial del Producto</h2>

            {/* COMPRAS */}
            <h3 className="font-semibold mb-2">📥 Compras</h3>
            <table className="w-full border mb-6">
                <thead className="bg-gray-100 ">
                    <tr>
                        <th>Fecha</th>
                        <th>Cantidad</th>
                        <th>Precio Compra</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {compras.length === 0 && (
                        <tr><td colSpan="4" className="text-center">Sin compras</td></tr>
                    )}
                    {compras.map((c, i) => (
                        <tr key={i}>
                            <td>{c.fecha}</td>
                            <td>{c.cantidad}</td>
                            <td>{c.precio_compra}</td>
                            <td>{c.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* VENTAS */}
            <h3 className="font-semibold mb-2">📤 Ventas</h3>
            <table className="w-full border mb-6">
                <thead className="bg-gray-100">
                    <tr>
                        <th>Fecha</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.length === 0 && (
                        <tr><td colSpan="4" className="text-center">Sin ventas</td></tr>
                    )}
                    {ventas.map((v, i) => (
                        <tr key={i}>
                            <td>{v.fecha}</td>
                            <td>{v.cantidad}</td>
                            <td>{v.precio_unitario}</td>
                            <td>{v.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                onClick={() => navigate("/productos")}
                className="px-4 py-2 bg-gray-600 text-white rounded"
            >
                Volver
            </button>
        </div>
    );
}

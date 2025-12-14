import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerCompra } from "../../api/comprasService";
import { msgError } from "../../utils/alert";

export default function DetalleCompraPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [cabecera, setCabecera] = useState(null);
    const [detalle, setDetalle] = useState([]);

    useEffect(() => {
        cargarCompra();
    }, [id]);

    const cargarCompra = async () => {
        try {
            const data = await obtenerCompra(id);
            setCabecera(data.compra);
            setDetalle(data.detalle);
            console.log("data", data);
        } catch (err) {
            msgError("Error", err.message);
        }
    };
    
    if (!cabecera) return null;
    
    
    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">
                Detalle de Compra #{cabecera.id_compra}
            </h1>

            {/* Cabecera */}
            <div className="mb-6">
                <p><strong>Proveedor:</strong> {cabecera.proveedor}</p>
                <p><strong>Factura:</strong> {cabecera.factura}</p>
                <p><strong>Operación Gravada:</strong> {cabecera.operacion_gravada}</p>
                <p><strong>IGV:</strong> {cabecera.igv}</p>
                <p><strong>Total:</strong> {cabecera.total}</p>
                <p><strong>Fecha:</strong> {cabecera.fecha}</p>
            </div>

            {/* Detalle */}
            <h2 className="font-semibold mb-2">Detalle de Productos</h2>

            <table className="w-full border mb-6">
                <thead className="bg-gray-100">
                    <tr>
                        <th>ID Detalle</th>
                        <th>Producto</th>
                        <th>Unidad</th>
                        <th>Cantidad</th>
                        <th>Precio Compra</th>
                    </tr>
                </thead>
                <tbody>
                    {detalle.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center py-4">
                                Sin detalle
                            </td>
                        </tr>
                    )}

                    {detalle.map((d) => (
                        <tr key={d.id_detalle_compra} className="border-t">
                            <td>{d.id_detalle_compra}</td>
                            <td>{d.producto}</td>
                            <td>{d.unidad}</td>
                            <td>{d.cantidad}</td>
                            <td>{d.precio_compra}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                onClick={() => navigate("/compras")}
                className="px-4 py-2 bg-gray-600 text-white rounded"
            >
                Volver
            </button>
        </div>
    );
}

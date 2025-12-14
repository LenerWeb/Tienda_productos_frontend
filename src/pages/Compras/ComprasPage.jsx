import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarCompras } from "../../api/comprasService";
import { msgError } from "../../utils/alert";

export default function ComprasPage() {
    const [compras, setCompras] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        cargarCompras();
    }, []);

    const cargarCompras = async () => {
        try {
            const data = await listarCompras();
            setCompras(data);
        } catch (err) {
            msgError("Error", err.message);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Compras</h1>

            <table className="w-full border">
                <thead className="bg-gray-100">
                    <tr>
                        <th>ID</th>
                        <th>Proveedor</th>
                        <th>Factura</th>
                        <th>Op. Gravada</th>
                        <th>IGV</th>
                        <th>Total</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {compras.length === 0 && (
                        <tr>
                            <td colSpan="8" className="text-center py-4">
                                No hay compras registradas
                            </td>
                        </tr>
                    )}

                    {compras.map((c) => (
                        <tr key={c.id_compra} className="border-t">
                            <td>{c.id_compra}</td>
                            <td>{c.proveedor}</td>
                            <td>{c.factura}</td>
                            <td>{c.operacion_gravada}</td>
                            <td>{c.igv}</td>
                            <td>{c.total}</td>
                            <td>{c.fecha}</td>
                            <td>
                                <button
                                    onClick={() =>
                                        navigate(`/compras/${c.id_compra}`)
                                    }
                                    className="text-blue-600 underline"
                                >
                                    Detalles
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

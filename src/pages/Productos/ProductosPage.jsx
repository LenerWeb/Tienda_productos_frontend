import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import {
    obtenerProductos,
    eliminarProducto,
} from "../../api/productosService";
import { msgConfirm, msgError, msgSuccess } from "../../utils/alert";

export default function ProductosPage() {
    const navigate = useNavigate();
    const { usuario } = useAuth();

    const [productos, setProductos] = useState([]);
    const [filtro, setFiltro] = useState("");

    const cargarProductos = async () => {
        try {
            const data = await obtenerProductos();
            setProductos(data);
        } catch (err) {
            msgError("Error", err.message);
        }
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    const handleEliminar = async (id) => {
        const ok = await msgConfirm(
            "Eliminar producto",
            "¿Deseas eliminar este producto?"
        );
        if (!ok) return;

        try {
            await eliminarProducto(id);
            msgSuccess("Éxito", "Producto eliminado");
            cargarProductos();
        } catch (err) {
            msgError("Error", err.message);
        }
    };

    const productosFiltrados = productos.filter((p) =>
        `${p.id_producto} ${p.nombre}`
            .toLowerCase()
            .includes(filtro.toLowerCase())
    );

    const puedeEditar =
        usuario?.rol === "admin" || usuario?.rol === "almacen";

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Productos</h1>

                {puedeEditar && (
                    <button
                        onClick={() => navigate("/productos/nuevo")}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Nuevo producto
                    </button>
                )}
            </div>

            <input
                type="text"
                placeholder="Buscar por nombre o código"
                className="border px-3 py-2 mb-4 w-full max-w-md"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
            />

            <div className="overflow-x-auto">
                <table className="min-w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-2 py-1">Código</th>
                            <th className="border px-2 py-1">Nombre</th>
                            <th className="border px-2 py-1">Descripción</th>
                            <th className="border px-2 py-1">Precio venta</th>
                            <th className="border px-2 py-1">Stock</th>
                            <th className="border px-2 py-1">Stock mínimo</th>
                            <th className="border px-2 py-1">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosFiltrados.map((p) => (
                            <tr key={p.id_producto}>
                                <td className="border px-2 py-1">{p.id_producto}</td>
                                <td className="border px-2 py-1">{p.nombre}</td>
                                <td className="border px-2 py-1">{p.descripcion}</td>
                                <td className="border px-2 py-1">{p.precio_venta}</td>
                                <td className="border px-2 py-1">{p.stock}</td>
                                <td className="border px-2 py-1">{p.stock_minimo}</td>
                                <td className="border px-2 py-1 space-x-2">
                                    <button
                                        onClick={() =>
                                            navigate(`/productos/historial/${p.id_producto}`)
                                        }
                                        className="text-indigo-600 underline"
                                    >
                                        Historial
                                    </button>

                                    {puedeEditar && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    navigate(`/productos/editar/${p.id_producto}`)
                                                }
                                                className="text-blue-600"
                                            >
                                                Editar
                                            </button>

                                            <button
                                                onClick={() => handleEliminar(p.id_producto)}
                                                className="text-red-600"
                                            >
                                                Eliminar
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

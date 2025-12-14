import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    crearProducto,
    obtenerProducto,
    actualizarProducto,
} from "../../api/productosService";
import { msgError, msgSuccess } from "../../utils/alert";

export default function ProductosForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        precio_venta: "",
        stock_minimo: "",
    });

    const cargarProducto = useCallback(async () => {
        try {
            const data = await obtenerProducto(id);
            setForm({
                nombre: data.nombre,
                descripcion: data.descripcion || "",
                precio_venta: data.precio_venta,
                stock_minimo: data.stock_minimo,
            });
        } catch (err) {
            msgError("Error", err.message);
        }
    }, [id]);


    useEffect(() => {
        if (id) cargarProducto();
    }, [cargarProducto, id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await actualizarProducto(id, form);
                msgSuccess("Éxito", "Producto actualizado");
            } else {
                await crearProducto(form);
                msgSuccess("Éxito", "Producto creado");
            }
            navigate("/productos");
        } catch (err) {
            msgError("Error actualizar", err.message);
            console.log("actualizar producto", err);
        }
    };

    return (
        <div className="p-6 max-w-lg">
            <h1 className="text-xl font-bold mb-4">
                {id ? "Editar producto" : "Nuevo producto"}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    name="nombre"
                    placeholder="Nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    className="border w-full px-3 py-2"
                />

                <textarea
                    name="descripcion"
                    placeholder="Descripción"
                    value={form.descripcion}
                    onChange={handleChange}
                    className="border w-full px-3 py-2"
                />

                <input
                    type="number"
                    name="precio_venta"
                    placeholder="Precio de venta"
                    value={form.precio_venta}
                    onChange={handleChange}
                    required
                    className="border w-full px-3 py-2"
                />

                <input
                    type="number"
                    name="stock_minimo"
                    placeholder="Stock mínimo"
                    value={form.stock_minimo}
                    onChange={handleChange}
                    required
                    className="border w-full px-3 py-2"
                />

                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Guardar
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/productos")}
                        className="bg-gray-400 text-white px-4 py-2 rounded"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

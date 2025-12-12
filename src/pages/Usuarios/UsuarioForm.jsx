import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  crearUsuario,
  actualizarUsuario,
  obtenerUsuario,
} from "../../api/usuariosService";
import Swal from "sweetalert2";

export default function UsuarioForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const esEdicion = Boolean(id);
  
  const [form, setForm] = useState({
    nombre: "",
    usuario: "",
    contrasena: "",
    rol: "vendedor",
    estado: "activo",
  });

  useEffect(() => {
    if (esEdicion) {
      obtenerUsuario(id)
      .then((data) => {
        setForm({
          nombre: data.nombre,
          usuario: data.usuario,
          contrasena: "",
          rol: data.rol,
          estado: data.estado,
        });
      })
      .catch (() => {
        Swal.fire("Error", "No de pudo cargar el usuario", "error");
      });
    }
  }, [id, esEdicion]);
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (esEdicion) {
        await actualizarUsuario(id, form);
        Swal.fire("Éxito", "Usuario actualizado", "success");
      } else {
        await crearUsuario(form);
        Swal.fire("Éxito", "Usuario creado", "success");
      }
      navigate("/usuarios");
    } catch {
      Swal.fire("Error", "No se pudo guardar el usuario", "error");
    }
  };
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-6">
      <h2 className="text-xl font-bold mb-4">
        {esEdicion ? "Editar Usuario" : "Nuevo Usuario"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block">Nombre</label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block">Usuario</label>
          <input
            name="usuario"
            value={form.usuario}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {!esEdicion && (
          <div>
            <label className="block">Contraseña</label>
            <input
              type="password"
              name="contrasena"
              value={form.contrasena}
              onChange={handleChange}
              minLength="6"
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
        )}

        <div>
          <label className="block">Rol</label>
          <select
            name="rol"
            value={form.rol}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="admin">Admin</option>
            <option value="vendedor">Vendedor</option>
          </select>
        </div>

        <div className="flex gap-3 mt-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            {esEdicion ? "Actualizar" : "Crear"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/usuarios")}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>

      </form>
    </div>
  );
}

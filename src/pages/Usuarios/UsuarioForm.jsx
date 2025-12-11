import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  crearUsuario,
  actualizarUsuario,
  obtenerUsuario,
} from "../../api/usuariosService";
import { msgSuccess, msgError } from "../../utils/alert";

export default function UsuarioForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const esEdicion = Boolean(id);

  const [form, setForm] = useState({
    nombre: "",
    usuario: "",
    password: "",
    rol: "vendedor",
    estado: "activo",
  });

  useEffect(() => {
    if (esEdicion) cargarUsuario();
  }, [esEdicion]);

  const cargarUsuario = async () => {
    try {
      const data = await obtenerUsuario(id);

      setForm({
        nombre: data.nombre,
        usuario: data.usuario,
        password: "",
        rol: data.rol,
        estado: data.estado,
      });
    } catch (e) {
      msgError("Error cargando usuario");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (esEdicion) {
        await actualizarUsuario(id, form);
        msgSuccess("Usuario actualizado correctamente");
      } else {
        await crearUsuario(form);
        msgSuccess("Usuario creado");
      }

      navigate("/usuarios");
    } catch (e) {
      msgError("Error al guardar usuario");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">
        {esEdicion ? "Editar Usuario" : "Crear Usuario"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-medium mb-1">Nombre:</label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Usuario:</label>
          <input
            name="usuario"
            value={form.usuario}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {!esEdicion && (
          <div>
            <label className="block font-medium mb-1">Contraseña:</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required={!esEdicion}
            />
          </div>
        )}

        <div>
          <label className="block font-medium mb-1">Rol:</label>
          <select
            name="rol"
            value={form.rol}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="admin">Admin</option>
            <option value="vendedor">Vendedor</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Estado:</label>
          <select
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Guardar
        </button>

      </form>
    </div>
  );
}

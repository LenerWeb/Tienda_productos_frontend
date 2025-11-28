import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { crearUsuario, actualizarUsuario, obtenerUsuario } from "../../api/usuariosService";
import { msgSuccess, msgError } from "../../utils/alert";

export default function UsuarioForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const esEdicion = Boolean(id);

  const [form, setForm] = useState({
    nombre: "",
    usuario: "",
    contrasena: "",
    rol: "admin",
    estado: "activo",
  });

  const [cargando, setCargando] = useState(false);

  // ==========================
  //   CARGAR DATOS EN EDICIÓN
  // ==========================
  useEffect(() => {
    if (!esEdicion) return;

    const fetchData = async () => {
      setCargando(true);
      try {
        const data = await obtenerUsuario(id); // ← CORREGIDO

        if (!data) return msgError("Usuario no encontrado");

        setForm({
          nombre: data.nombre || "",
          usuario: data.usuario || "",
          contrasena: "", // no se usa en edición
          rol: data.rol || "admin",
          estado: data.estado || "activo",
        });
      } catch (e) {
        msgError("Error cargando usuario");
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, [esEdicion, id]);

  // ==========================
  //   MANEJAR CAMBIOS
  // ==========================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ==========================
  //   ENVIAR FORMULARIO
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación
    if (!form.nombre.trim()) return msgError("El nombre es obligatorio");
    if (!form.usuario.trim()) return msgError("El usuario es obligatorio");

    // Validar contraseña solo en creación
    if (!esEdicion) {
      if (!form.contrasena || form.contrasena.length < 6) {
        return msgError("La contraseña debe tener al menos 6 caracteres");
      }
    }

    try {
      setCargando(true);

      if (esEdicion) {
        await actualizarUsuario(id, {
          nombre: form.nombre,
          usuario: form.usuario,
          rol: form.rol,
          estado: form.estado,
        });

        msgSuccess("Usuario actualizado correctamente");
      } else {
        await crearUsuario({
          nombre: form.nombre,
          usuario: form.usuario,
          contrasena: form.contrasena,
          rol: form.rol,
          estado: form.estado,
        });

        msgSuccess("Usuario creado correctamente");
      }

      navigate("/usuarios");

    } catch (e) {
      msgError("Error al guardar usuario");
    } finally {
      setCargando(false);
    }
  };

  // ==========================
  //   LOADING
  // ==========================
  if (cargando) {
    return (
      <div className="text-center text-lg font-semibold text-blue-600 py-8">
        Cargando datos...
      </div>
    );
  }

  // ==========================
  //   UI DEL FORMULARIO
  // ==========================
  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg p-8 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
        {esEdicion ? "Editar Usuario" : "Crear Usuario"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Usuario */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Usuario
          </label>
          <input
            type="text"
            name="usuario"
            value={form.usuario}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Contraseña solo en crear */}
        {!esEdicion && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              name="contrasena"
              value={form.contrasena}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>
        )}

        {/* Rol */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rol
          </label>
          <select
            name="rol"
            value={form.rol}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-lg bg-white"
          >
            <option value="admin">Administrador</option>
            <option value="empleado">Empleado</option>
          </select>
        </div>

        {/* Estado solo en edición */}
        {esEdicion && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Estado
            </label>
            <select
              name="estado"
              value={form.estado}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg bg-white"
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
        )}

        {/* Botones */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate("/usuarios")}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg"
          >
            {esEdicion ? "Actualizar" : "Crear"}
          </button>
        </div>

      </form>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listarUsuarios, desactivarUsuario } from "../../api/usuariosService";
import { msgSuccess, msgError, msgConfirm } from "../../utils/alert";

export default function UsuariosPage() {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  // ==========================
  //   Cargar usuarios
  // ==========================
  const cargarUsuarios = async () => {
    try {
      setCargando(true);
      const data = await listarUsuarios();
      console.log("USUARIOS RECIBIDOS EN LA TABLA:", data);
      setUsuarios(data);

    } catch (e) {
      msgError("Error al cargar usuarios");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // ==========================
  //   Cambiar estado
  // ==========================
  const handleCambiarEstado = async (id_usuario, estadoActual) => {
    const nuevoEstado = estadoActual === "activo" ? "inactivo" : "activo";

    const r = await msgConfirm(
      `¿Deseas cambiar el estado del usuario a "${nuevoEstado}"?`
    );

    if (!r.isConfirmed) return;

    try {
      await desactivarUsuario(id_usuario, nuevoEstado); // ← CORREGIDO
      msgSuccess("Estado actualizado correctamente");
      cargarUsuarios();
    } catch (e) {
      msgError("Error al actualizar el estado del usuario");
    }
  };

  // ==========================
  //   UI Cargando
  // ==========================
  if (cargando) {
    return (
      <div className="text-center text-blue-600 font-bold py-8">
        Cargando usuarios...
      </div>
    );
  }

  // ==========================
  //   UI Principal
  // ==========================
  return (
    <div className="p-6">
      {/* Encabezado */}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-700">
          Gestión de Usuarios
        </h1>

        <button
          onClick={() => navigate("/usuarios/nuevo")}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          + Crear Usuario
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Nombre</th>
              <th className="p-3 border">Usuario</th>
              <th className="p-3 border">Rol</th>
              <th className="p-3 border">Estado</th>
              <th className="p-3 border text-center">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No hay usuarios registrados
                </td>
              </tr>
            ) : (
              usuarios.map((u) => (
                <tr key={u.id_usuario} className="hover:bg-gray-50">
                  <td className="p-3 border">{u.id_usuario}</td>
                  <td className="p-3 border">{u.nombre}</td>
                  <td className="p-3 border">{u.usuario}</td>
                  <td className="p-3 border capitalize">{u.rol}</td>

                  <td
                    className={`p-3 border font-semibold ${
                      u.estado === "activo"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {u.estado}
                  </td>

                  <td className="p-3 border text-center space-x-2">

                    {/* Editar */}
                    <button
                      onClick={() => navigate(`/usuarios/editar/${u.id_usuario}`)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Editar
                    </button>

                    {/* Reset Contraseña */}
                    <button
                      onClick={() => navigate(`/usuarios/reset/${u.id_usuario}`)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Reset
                    </button>

                    {/* Cambiar estado */}
                    <button
                      onClick={() => handleCambiarEstado(u.id_usuario, u.estado)}
                      className={`px-3 py-1 text-white rounded 
                        ${
                          u.estado === "activo"
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                    >
                      {u.estado === "activo" ? "Desactivar" : "Activar"}
                    </button>

                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

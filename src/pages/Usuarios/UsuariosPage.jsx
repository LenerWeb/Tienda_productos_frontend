import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarUsuarios, desactivarUsuario } from "../../api/usuariosService";
import { msgSuccess, msgError, msgConfirm } from "../../utils/alert";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);

  //   Cargar usuarios
  const cargar = async () => {
    const data = await listarUsuarios();
    setUsuarios(data);
  };

  useEffect(() => {
    cargar();
  }, []);

  //   Cambiar estado
  const cambiarEstado = async (user) => {
    const nuevoEstado = user.estado === "activo" ? "inactivo" : "activo";

    const confirmar = await msgConfirm(`¿Deseas cambiar el estado a ${nuevoEstado}?`);
    if (!confirmar.isConfirmed) return;
    try {
      await desactivarUsuario(user.id_usuario, nuevoEstado);
      msgSuccess("Estado actualizado");
      cargar();
    } catch (e) {
      msgError(e?.message || "No se pudo cambiar el estado");
    }
  };

  //   UI Principal
  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Usuarios</h2>

        <Link
          to="/usuarios/nuevo"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Nuevo Usuario
        </Link>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-2">ID</th>
            <th className="border px-2">Nombre</th>
            <th className="border px-2">Usuario</th>
            <th className="border px-2">Rol</th>
            <th className="border px-2">Estado</th>
            <th className="border px-2">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id_usuario}>
              <td className="border px-2">{u.id_usuario}</td>
              <td className="border px-2">{u.nombre}</td>
              <td className="border px-2">{u.usuario}</td>
              <td className="border px-2">{u.rol}</td>
              <td className="border px-2">{u.estado}</td>
              <td className="border px-2 space-x-2">

                <Link
                  to={`/usuarios/editar/${u.id_usuario}`}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Editar
                </Link>

                <Link
                  to={`/usuarios/reset/${u.id_usuario}`}
                  className="bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  Reset
                </Link>

                <button
                  onClick={() => cambiarEstado(u)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  {u.estado === "activo" ? "Desactivar" : "Activar"}
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

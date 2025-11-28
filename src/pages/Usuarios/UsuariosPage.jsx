
import React, { useEffect, useState } from "react";
import { listarUsuarios, desactivarUsuario } from "../../api/usuariosService";
import { Link } from "react-router-dom";

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const data = await listarUsuarios();
      setUsuarios(data);
      console.log("fetchUsuarios", data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsuarios(); }, []);

  const handleDesactivar = async (id) => {
    if (!window.confirm("¿Desactivar/activar usuario?")) return;
    try {
      await desactivarUsuario(id);
      await fetchUsuarios();
    } catch (err) { alert(err.message); }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Usuarios</h2>
        <Link to="/usuarios/nuevo" className="btn">Crear usuario</Link>
      </div>

      {loading ? <p>Cargando...</p> : (
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th>Id</th><th>Nombre</th><th>Usuario</th><th>Rol</th><th>Estado</th><th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id_usuario}>
                <td>{u.id_usuario}</td>
                <td>{u.nombre}</td>
                <td>{u.usuario}</td>
                <td>{u.rol}</td>
                <td>{u.estado}</td>
                <td>
                  <Link to={`/usuarios/editar/${u.id_usuario}`} className="mr-2">Editar</Link>
                  <button onClick={() => handleDesactivar(u.id_usuario)} className="mr-2">
                    {u.estado === "activo" ? "Desactivar" : "Activar"}
                  </button>
                  <Link to={`/usuarios/reset/${u.id_usuario}`}>Reset</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
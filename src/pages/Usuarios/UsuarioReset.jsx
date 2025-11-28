import React, { useEffect, useState } from "react";
import { resetPassword, obtenerUsuario } from "../../api/usuariosService";
import { useNavigate, useParams } from "react-router-dom";

export default function UsuarioReset() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Para mostrar info del usuario (si backend tiene GET /usuarios/:id)
  const [usuarioInfo, setUsuarioInfo] = useState(null);
  const [cargandoUsuario, setCargandoUsuario] = useState(false);

  // Cargar datos del usuario
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        setCargandoUsuario(true);
        const data = await obtenerUsuario(id); // solo funciona si GET /usuarios/:id existe
        setUsuarioInfo(data);
      } catch (error) {
        console.log("GET usuario no disponible", error.message);
      } finally {
        setCargandoUsuario(false)
      }
    };

    fetchUsuario();
  }, [id]);

  // Validar y enviar al backend
  const onSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      setLoading(true);
      await resetPassword(id, password);

      alert("Contraseña reseteada correctamente");
      navigate("/usuarios");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Render
  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Resetear Contraseña</h2>

      {/* Datos del usuario (solo si se pudieronn cargar) */}
      {cargandoUsuario && <p className="text-gray-600 mb-2">Cargando usuario...</p>}

      {usuarioInfo && (
        <div className="mb-4 p-3 bg-gray-100 rounded">
          <p><strong>Nombre:</strong> {usuarioInfo.nombre}</p>
          <p><strong>Usuario:</strong> {usuarioInfo.usuario}</p>
          <p><strong>Rol:</strong> {usuarioInfo.rol}</p>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Contraseña */}
        <div>
          <label className="block font-semibold">Nueva contraseña</label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Botones */}
        <div className="flex gap-3 mt-4">
          <button 
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded"            
            >
              {loading ? "Procesando..." : "Resetear"}
            </button>
          <button
            type="button"
            onClick={() => navigate("/usuarios")}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
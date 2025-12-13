import React, { useState } from "react";
import { resetPassword } from "../../api/usuariosService";
import { useNavigate, useParams } from "react-router-dom";
import { msgSuccess, msgError } from "../../utils/alert";

export default function UsuarioReset() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await resetPassword(id, password);
      msgSuccess("Contraseña actualizada");
      navigate("/usuarios");
    } catch (err) {
      msgError(err?.message || "No se pudo actualizar la contraseña");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded mt-6">
      <h2 className="text-xl font-bold mb-4">Resetear Contraseña</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block">Nueva contraseña</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            minLength="6"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Actualizar
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

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../api/usuariosService";
import { msgSuccess, msgError } from "../../utils/alert";

export default function UsuarioReset() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      msgError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      await resetPassword(id, password);
      msgSuccess("Contraseña actualizada");
      navigate("/usuarios");
    } catch (e) {
      msgError("Error reseteando contraseña");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow mt-6">
      <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">
        Reset de Contraseña
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-medium mb-1">Nueva Contraseña:</label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          type="submit"
        >
          Actualizar Contraseña
        </button>

      </form>
    </div>
  );
}

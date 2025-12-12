import React, { useState } from "react";
import useAuth from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
   const { login } = useAuth();
   const navigate = useNavigate();
   const [usuario, setUsuario] = useState("");
   const [contrasena, setContrasena] = useState("");
   const [loading, setLoading] = useState(false);

   const submit = async (e) => {
      e.preventDefault();
      setLoading(true);

      try {
         const res = await fetch("http://localhost:4000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario, contrasena }),
         });

         const data = await res.json();
         if (!res.ok) throw new Error(data?.mensaje || "Login falló");

         login(data.token, data.usuario);
         navigate("/");
      } catch (err) {
         Swal.fire("Error", err.message, "error");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">

         <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>

            <form onSubmit={submit} className="space-y-4">

               <div>
                  <label className="block mb-1 font-medium">Usuario</label>
                  <input
                     value={usuario}
                     onChange={(e) => setUsuario(e.target.value)}
                     required
                     className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                  />
               </div>

               <div>
                  <label className="block mb-1 font-medium">Contraseña</label>
                  <input
                     type="password"
                     value={contrasena}
                     onChange={(e) => setContrasena(e.target.value)}
                     required
                     className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                  />
               </div>

               <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-blue-400"
               >
                  {loading ? "Ingresando..." : "Entrar"}
               </button>

            </form>
         </div>
      </div>
   );
}





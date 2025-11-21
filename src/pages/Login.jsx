import React, { useState } from "react";
import useAuth from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
   const { login } = useAuth();
   const navigate = useNavigate();
   const [usuario, setUsuario] = useState("");
   const [contrasena, setContrasena] = useState("");
   const [loading, setLoading] = useState(false);

   const submit = async (e) => {
      console.log("submit")
      e.preventDefault();
      setLoading(true);
      try {
         const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario, contrasena}),
         });
         const data = await res.json();
         console.log("login", data)
         if (!res.ok) throw new Error(data?.mensaje || "Login fallo");
         login(data.token, data.usuario);
         navigate("/");
      } catch (err) {
         alert(err.message);
      }finally{
         setLoading(false);
      }
   };

return(
   <div style={{ maxWidth: 420, margin: "60px auto"}}>
      <h2>Iniciar sesion</h2>
      <form onSubmit={submit}>
         <div>
            <label>Usuario</label>
            <input value={usuario} onChange={(e)=>setUsuario(e.target.value)} required />
         </div>
         <div>
            <label>Contraseña</label>
            <input type="password" value={contrasena} onChange={(e)=>setContrasena(e.target.value)} required />
         </div>
         <div style={{marginTop: 12 }}>
            <button type="submit" disabled={loading}>{loading? "Entrando..." : "Entrar"}</button>
         </div>
      </form>
   </div>
);
}




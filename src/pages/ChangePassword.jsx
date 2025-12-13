import React, { useState } from "react";
import useAuth from "../auth/useAuth";
import { msgError, msgSuccess } from "../utils/alert";

export default function ChangePassword() {
   const { token, logout } = useAuth();
   const [oldPass, setOldPass] = useState("");
   const [newPass, setNewPass] = useState("");
   const [confirmPass, setConfirmPass] = useState("");
   const [loading, setLoading] = useState(false);

   const submit = async (e) => {
      e.preventDefault();
      if (newPass !== confirmPass) {
         msgError("Las contraseñas no coinciden");
         return;
      }
      setLoading(true);
      try {
         const res = await fetch("/api/usuarios/change-password", {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
               Authorization: "Bearer " + token,
            },
            body: JSON.stringify({ oldPass, newPass }),
         });
         const data = await res.json();
         if (!res.ok) throw new Error(data?.mensaje || "Error");
         msgSuccess("Contraseña actualizada. Vuelva a iniciar sesión.");
         logout();         
      } catch (err) {
         msgError(err?.message || "Error al cambiar contraseña");
      } finally {
         setLoading(false);
      }
   };
   return(
      <div style={{ maxWidth: 520, margin: "30px auto"}}>
         <h3>Cambiar contraseña</h3>
         <form onSubmit={submit}>
            <div>
               <label>Contraseña actual</label>
               <input type="password" value={oldPass} onChange={(e)=>setOldPass(e.target.value)} required />
            </div>
            <div>
               <label>Nueva contraseña</label>
               <input type="password" value={newPass} onChange={(e)=>setNewPass(e.target.value)} required />
            </div>
            <div>
               <label>Confirmar nueva</label>
               <input type="password" value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)} required />
            </div>
            <div style={{ marginTop: 12 }}>
               <button disabled={loading}>{loading? "Procesando..." : "Cambiar contraseña"}</button>
            </div>
         </form>
      </div>
   );
}



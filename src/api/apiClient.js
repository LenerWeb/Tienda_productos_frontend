const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

export const getToken = () => localStorage.getItem("token");

// Manejo de errores
async function manejarError(res) {
  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("Respuesta inválida del servidor");
  }

  if (!res.ok) {
    const msg = data?.mensaje || data?.error || "Error en la petición";
    throw new Error(msg);
  }

  return data;
}


// Métodos

export async function apiGet(url) {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });

  return manejarError(res);
}

export async function apiPost(url, body) {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
    body: JSON.stringify(body),
  });

  return manejarError(res);
}

export async function apiPut(url, body) {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
    body: JSON.stringify(body),
  });

  return manejarError(res);
}

export async function apiDelete(url, body) {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getToken(),
    },
    body: JSON.stringify(body),
  });

  return manejarError(res);
}


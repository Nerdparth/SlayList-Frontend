import { useState } from "react";
const hostUrl = import.meta.env.VITE_API_BASE_URL;

const useLogIn = () => {
  const [logInResponse, setLogInResponse] = useState(null);
  const login = async (payload) => {
    const res = await fetch(`${hostUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      setLogInResponse(res.status);
    } else {
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      setLogInResponse(data);
    }
  };
  return { login, logInResponse };
};

export default useLogIn;

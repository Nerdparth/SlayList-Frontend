const hostUrl = import.meta.env.VITE_API_BASE_URL;

import { useState } from "react";

const useSignup = () => {
  const [signUpResponse, setSignUpResponse] = useState(null);
  const signUp = async (payload) => {
    const res = await fetch(`${hostUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      setSignUpResponse(res.status);
    } else {
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      setSignUpResponse(data);
    }
  };
  return { signUp, signUpResponse };
};

export default useSignup;

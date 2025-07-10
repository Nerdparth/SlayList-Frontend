import { useState } from "react";
const hostUrl = import.meta.env.VITE_API_BASE_URL;

const useCreateProject = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createProject = async (payload) => {
    setLoading(true);
    try {
      let res = await fetch(`${hostUrl}/add-project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        body: JSON.stringify(payload),
      });
      if (res.status === 401 || res.status === 403) {
        const accessToken = await refreshAccessToken();
        if (!accessToken) {
          setResponse({
            error: true,
            message: "Session expired. Please log in again.",
          });
          return;
        }
        res = await fetch(`${hostUrl}/add-project`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
          body: JSON.stringify(payload),
        });
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Something went wrong");
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { createProject, response, loading, error };
};

export default useCreateProject;

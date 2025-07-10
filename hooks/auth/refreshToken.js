export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh");

  if (!refreshToken) return null;

  try {
    const res = await fetch("https://nerdparth2.pythonanywhere.com/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!res.ok) {
      console.warn("Refresh token is expired or invalid.");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return null;
    }

    const data = await res.json();
    localStorage.setItem("access", data.access);
    return data.access;
  } catch (err) {
    console.error("Error while refreshing token:", err);
    return null;
  }
};
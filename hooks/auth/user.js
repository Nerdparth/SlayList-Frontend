import { useState } from "react";
import { refreshAccessToken } from "./refreshToken";
const hostUrl = import.meta.env.VITE_API_BASE_URL;

export const useGetUser = () => {
  const [getUserResponse, setGetUserResponse] = useState(null);
  const getUser = async () => {
    let res = await fetch(`${hostUrl}/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    if (res.status === 401 || res.status === 403) {
      const accessToken = await refreshAccessToken();
      if (!accessToken) {
        setGetUserResponse({
          error: true,
          message: "Session expired. Please log in again.",
        });
        return;
      }

      res = await fetch(`${hostUrl}/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
    const data = await res.json();
    setGetUserResponse(data);
  };
  return { getUser, getUserResponse };
};

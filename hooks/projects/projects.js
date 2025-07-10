import { useState } from "react";
const hostUrl = import.meta.env.VITE_API_BASE_URL;


const useGetAllProjects = () => {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  const getProjects = async () => {
    try {
      setLoading(true);
      let res = await fetch(
        `${hostUrl}/all-projects-name-and-id`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        },
      );
      if (res.status === 401 || res.status === 403) {
        const accessToken = await refreshAccessToken();
        if (!accessToken) {
          setError({
            error: true,
            message: "Session expired. Please log in again.",
          });
          return;
        }
        res = await fetch(
          `${hostUrl}/all-projects-name-and-id`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          },
        );
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Something went wrong");
      setProjects(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { getProjects, projects, loading, error };
};

export default useGetAllProjects;

export const useGetProjectAnalytics = () => {
  const [getProjectAnalyticsResponse, setGetProjectAnalyticsResponse] =
    useState(null);
  const [getProjectAnalyticsError, setGetProjectAnalyticsError] =
    useState(null);

  const getProjectAnalytics = async (id) => {
    let res = await fetch(
      `${hostUrl}/project-analytics/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      },
    );
    if (res.status === 401 || res.status === 403) {
      const accessToken = await refreshAccessToken();
      if (!accessToken) {
        setGetProjectAnalyticsResponse({
          error: true,
          message: "Session expired. Please log in again.",
        });
        return;
      }
      res = await fetch(
        `${hostUrl}/project-analytics/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        },
      );
    }

    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Something went wrong");
    setGetProjectAnalyticsResponse(data);
  };

  return { getProjectAnalytics, getProjectAnalyticsResponse };
};

export const useGetProjectById = () => {
  const [getProjectByIdResponse, setGetProjectByIdResponse] = useState(null);

  const getProjectById = async (id) => {
    let res = await fetch(`${hostUrl}/get-project/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    if (res.status === 401 || res.status === 403) {
      const accessToken = await refreshAccessToken();
      if (!accessToken) {
        setGetProjectByIdResponse({
          error: true,
          message: "Session expired. Please log in again.",
        });
        return;
      }
      res = await fetch(`${hostUrl}/get-project/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
    }
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Something went wrong");
    setGetProjectByIdResponse(data);
  };
  return { getProjectById, getProjectByIdResponse };
};

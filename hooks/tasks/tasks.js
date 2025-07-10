import { useState } from "react";
const hostUrl = import.meta.env.VITE_API_BASE_URL;

const useGetProjectTasks = () => {
  const [getProjectTasksResponse, setGetProjectTasksResponse] = useState(null);

  const getProjectTasks = async (id) => {
    let res = await fetch(
      `${hostUrl}/get-project-task/${id}`,
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
        setGetProjectTasksResponse({
          error: true,
          message: "Session expired. Please log in again.",
        });
        return;
      }
      res = await fetch(
        `${hostUrl}/get-project-task/${id}`,
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
    setGetProjectTasksResponse(data);
  };

  return { getProjectTasks, getProjectTasksResponse };
};

export default useGetProjectTasks;

export const useGetAllTasks = () => {
  const [getAllTasksResponse, setGetAllTasksResponse] = useState(null);
  const getAllTasks = async () => {
    let res = await fetch(`${hostUrl}/get-all-tasks`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    if (res.status === 401 || res.status === 403) {
      const accessToken = await refreshAccessToken();
      if (!accessToken) {
        setGetAllTasksResponse({
          error: true,
          message: "Session expired. Please log in again.",
        });
        return;
      }
      res = await fetch(`${hostUrl}/get-all-tasks`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
    }
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Something went wrong");
    setGetAllTasksResponse(data);
  };

  return { getAllTasks, getAllTasksResponse };
};

export const useUpdateTaskStatus = () => {
  const [updateTaskStatusResponse, setUpdateTaskStatusResponse] =
    useState(null);
  const updateTaskStatus = async (id, payload) => {
    let res = await fetch(
      `${hostUrl}/update-status/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        body: JSON.stringify(payload),
      },
    );
    if (res.status === 401 || res.status === 403) {
      const accessToken = await refreshAccessToken();
      if (!accessToken) {
        setUpdateTaskStatusResponse({
          error: true,
          message: "Session expired. Please log in again.",
        });
        return;
      }
      res = await fetch(`${hostUrl}/update-status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        body: JSON.stringify(payload),
      });
    }
    const data = await res.json();
    setUpdateTaskStatusResponse(data);
  };

  return { updateTaskStatus, updateTaskStatusResponse };
};

export const useDeleteTask = () => {
  const deleteTask = async (id) => {
    let res = await fetch(`${hostUrl}/delete-task/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
    if (res.status === 401 || res.status === 403) {
      const accessToken = await refreshAccessToken();
      if (!accessToken) {
        console.log({
          error: true,
          message: "Session expired. Please log in again.",
        });
        return;
      }
      res = await fetch(`${hostUrl}/delete-task/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
    }
  };
  return { deleteTask };
};

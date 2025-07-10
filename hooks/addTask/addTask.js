import { useState } from "react";
const hostUrl = import.meta.env.VITE_API_BASE_URL;


const useAddTask = () => {
  const [addTaskResponse, setAddTaskResponse] = useState(null);
  const [addTaskLoading, setAddTaskLoading] = useState(false);

  const addTask = async (payload) => {
    setAddTaskLoading(true);
    let res = await fetch(`${hostUrl}/add-task`, {
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
        setAddTaskResponse({
          error: true,
          message: "Session expired. Please log in again.",
        });
        return;
      }
      res = await fetch(`${hostUrl}/add-task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        body: JSON.stringify(payload),
      });
    }
    const data = await res.json();
    if (!res.ok) throw new Error(data.details || "Something went wrong");
    setAddTaskResponse(data);
    setAddTaskLoading(false);
  };

  return { addTask, addTaskResponse };
};

export default useAddTask;

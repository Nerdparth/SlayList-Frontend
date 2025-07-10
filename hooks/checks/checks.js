import { useState } from "react";
const hostUrl = import.meta.env.VITE_API_BASE_URL;

export const useGetAllChecks = () => {
  const [checksLoading, setChecksLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [checksError, setChecksError] = useState(null);

  const getChecks = async () => {
    setChecksLoading(true);
    try {
      let res = await fetch(`${hostUrl}/get-checks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
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
        res = await fetch(`${hostUrl}/get-checks`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
      }
      const data = await res.json();

      if (!res.ok) throw new Error(data.detail || "Something went wrong");
      setResponse(data);
    } catch (err) {
      setChecksError(err.message);
    } finally {
      setChecksLoading(false);
    }
  };
  return { getChecks, response, setResponse, checksError, checksLoading };
};

export const useCreateCheck = () => {
  const [createCheckloading, setCreateCheckLoading] = useState(false);
  const [createCheckResponse, setCreateCheckResponse] = useState(null);
  const [createCheckError, setCreateCheckError] = useState(null);
  const createCheck = async (payload) => {
    try {
      setCreateCheckLoading(true);
      let res = await fetch(`${hostUrl}/add-check`, {
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
          setCreateCheckResponse({
            error: true,
            message: "Session expired. Please log in again.",
          });
          return;
        }
        res = await fetch(`${hostUrl}/add-check`, {
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
      setCreateCheckResponse(data);
    } catch (err) {
      setCreateCheckError(err);
    } finally {
      setCreateCheckLoading(false);
    }
  };

  return {
    createCheck,
    createCheckResponse,
    createCheckloading,
    createCheckError,
  };
};

export const useDeleteCheck = () => {
  const [deleteResponse, setDeleteResponse] = useState(null);
  const [deleteloading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const deleteCheck = async (id) => {
    try {
      setDeleteLoading(true);
      let res = await fetch(
        `${hostUrl}/delete-check/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        },
      );
      if (res.status === 401 || res.status === 403) {
        const accessToken = await refreshAccessToken();
        if (!accessToken) {
          setDeleteResponse({
            error: true,
            message: "Session expired. Please log in again.",
          });
          return;
        }
        res = await fetch(`${hostUrl}/delete-check/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Something went wrong");
      setDeleteResponse(data);
    } catch (err) {
      setDeleteError(err);
    } finally {
      setDeleteLoading(false);
    }
  };
  return { deleteCheck, deleteResponse, deleteloading, deleteError };
};

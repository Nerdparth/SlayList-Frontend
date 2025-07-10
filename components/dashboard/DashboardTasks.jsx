import { useEffect, useState } from "react";
import { useGetAllTasks } from "../../hooks/tasks/tasks";
import Card from "./Card";
import CreateProject from "./CreateProject";
import { useGetUser } from "../../hooks/auth/user";
const hostUrl = import.meta.env.VITE_BASE_URL;


const DashboardTasks = ({ handleProjectsChange }) => {
  const { getAllTasks, getAllTasksResponse } = useGetAllTasks();
  const [statusUpdated, setStatusUpdated] = useState(false);
  const { getUser, getUserResponse } = useGetUser();

  console.log(hostUrl)

  const updateTasks = () => {
    setStatusUpdated((prev) => !prev);
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getAllTasks();
  }, [statusUpdated]);
  console.log(localStorage.getItem("access"));

  return (
    <>
      <div className="justify-content-between d-flex">
        <h1 style={{ display: "inline" }} className="fw-lighter ms-2">
          Hi {getUserResponse?.username},
        </h1>
        <button
          href="#"
          className="btn btn-success me-3"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal2"
          style={{ height: 40 }}
        >
          <i className="fa-solid fa-user-plus"></i> Create Project
        </button>
      </div>
      <div className="row">
        <div
          className={`col ${getAllTasksResponse && getAllTasksResponse?.filter((task) => task.status === "not_started").length != 0 ? "" : `border-end`} me-5`}
        >
          <span className="lead fw-semibold mb-3 ms-3">to be started 🔰</span>
          <div style={{ marginTop: 20 }}>
            {getAllTasksResponse &&
            getAllTasksResponse?.filter((task) => task.status === "not_started")
              .length != 0 ? (
              getAllTasksResponse
                ?.filter((task) => task.status === "not_started")
                .map((task) => (
                  <Card
                    key={task.id}
                    taskId={task.id}
                    priority={task.priority}
                    title={task.title}
                    description={task.description}
                    project={task.project.title}
                    category={task.project.category}
                    status={task.status}
                    started_at={task.started_at}
                    updateTasks={updateTasks}
                  />
                ))
            ) : (
              <div
                className="d-flex align-items-center"
                style={{ height: "59vh", marginLeft: 70 }}
              >
                <p className="text-secondary">
                  No to be started tasks to show 🙈
                </p>
              </div>
            )}
          </div>
        </div>
        <div
          className={`col ${getAllTasksResponse && getAllTasksResponse?.filter((task) => task.status === "in_progress").length != 0 ? `` : `border-end`} me-5`}
        >
          <span className="lead fw-semibold ">In progress 📈</span>
          <div style={{ marginTop: 20 }}>
            {getAllTasksResponse &&
            getAllTasksResponse?.filter((task) => task.status === "in_progress")
              .length != 0 ? (
              getAllTasksResponse
                ?.filter((task) => task.status === "in_progress")
                .map((task) => (
                  <Card
                    key={task.id}
                    taskId={task.id}
                    priority={task.priority}
                    title={task.title}
                    description={task.description}
                    project={task.project.title}
                    category={task.project.category}
                    status={task.status}
                    started_at={task.started_at}
                    updateTasks={updateTasks}
                  />
                ))
            ) : (
              <div
                className="d-flex align-items-center"
                style={{ height: "59vh", marginLeft: 40 }}
              >
                <p>No in progress tasks to show 🙉</p>
              </div>
            )}
          </div>
        </div>
        <div
          className={`col ${getAllTasksResponse && getAllTasksResponse?.filter((task) => task.status === "completed").length != 0 ? `` : `border-end`} me-5`}
        >
          <span className="lead fw-semibold mb-3">completed 👍</span>
          <div style={{ marginTop: 20 }}>
            {getAllTasksResponse &&
            getAllTasksResponse?.filter((task) => task.status === "completed")
              .length != 0 ? (
              getAllTasksResponse
                ?.filter((task) => task.status === "completed")
                .map((task) => (
                  <Card
                    key={task.id}
                    taskId={task.id}
                    priority={task.priority}
                    title={task.title}
                    description={task.description}
                    project={task.project.title}
                    category={task.project.category}
                    status={task.status}
                    started_at={task.started_at}
                    updateTasks={updateTasks}
                  />
                ))
            ) : (
              <div
                className="d-flex align-items-center"
                style={{ height: "59vh", marginLeft: 40 }}
              >
                <p>No completed tasks to show 🙊</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <CreateProject handleProjectsChange={handleProjectsChange} />
    </>
  );
};

export default DashboardTasks;

import React, { useEffect, useState } from "react";
import {
  useGetAllChecks,
  useCreateCheck,
  useDeleteCheck,
} from "../../hooks/checks/checks";
import useGetAllProjects from "../../hooks/projects/projects";
import { toast } from "react-toastify";

const Checks = () => {
  const { getChecks, response, setResponse, checksError, checksLoading } =
    useGetAllChecks();
  const { getProjects, projects, loading, error } = useGetAllProjects();
  const {
    createCheck,
    createCheckResponse,
    createCheckloading,
    createCheckError,
  } = useCreateCheck();
  const [checkTitle, setCheckTitle] = useState("");
  const [checkProject, setCheckProject] = useState("");

  const { deleteCheck, deleteResponse, deleteloading, deleteError } =
    useDeleteCheck();

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    getChecks();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      createCheck({ title: checkTitle, project: checkProject });
      toast.success(
        "Check added, Would delete after 24 hours. Make sure to complete it 😤",
      );
    } catch (err) {
      toast.error("There's a bug, can't add a check right now 🥹.");
    }
    setCheckTitle("");
    setCheckProject("");
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    deleteCheck(id);
    setResponse((prevChecks) => prevChecks.filter((check) => check.id !== id));
  };

  useEffect(() => {
    if (createCheckResponse) {
      setResponse((prev) => [...prev, createCheckResponse.check]);
    }
  }, [createCheckResponse]);
  console.log(createCheckResponse);

  return (
    <div>
      <div className="col-8 my-5">
        <div className="row">
          <form className="d-flex" onSubmit={handleSubmit} role="search">
            <div className="col-4 me-2 ">
              <span className="lead fw-normal text-secondary ms-3">
                New Check For Today:{" "}
              </span>
            </div>

            <div className="col-3 me-2">
              <input
                className="form-control"
                type="search"
                placeholder="Title"
                aria-label="Search"
                value={checkTitle}
                onChange={(e) => {
                  setCheckTitle(e.target.value);
                }}
                required
              />
            </div>
            <div className="col-2 me-2">
              <select
                className="form-select form-select text-secondary col-2"
                aria-label="Small select example"
                value={checkProject}
                onChange={(e) => setCheckProject(e.target.value)}
                required
              >
                <option value="" disabled>
                  Project
                </option>
                {projects.map((project) => (
                  <option key={project.id} value={`${project.id}`}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary col-2" type="submit">
              Add a check
            </button>
          </form>
        </div>
      </div>

      <p className="h4 ms-3 text-secondary mb-4">Today's Checks</p>

      <div className="col-11 mx-auto rounded border border-secondary-subtle p-5">
        <ul className="list-group list-group-flush">
          {response && response.length != 0 ? (
            response.map((check) => (
              <li key={check.id} className="list-group-item py-3">
                <div className="form-check form-switch d-flex justify-content-between align-items-start">
                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`check-${check.id}`}
                    />
                    <label
                      className="form-check-label ms-3 text-secondary"
                      htmlFor={`check-${check.id}`}
                      style={{
                        fontSize: "1.05rem",
                        fontWeight: "500",
                      }}
                    >
                      {check.title}
                      <div
                        className="ms-1 mt-1"
                        style={{
                          fontSize: "0.85rem",
                          color: "#7d7d7d", // muted silver
                          fontWeight: "400",
                        }}
                      >
                        (project:{" "}
                        <span style={{ color: "#5c7cfa", fontWeight: "500" }}>
                          {check?.project?.title}
                        </span>{" "}
                        | category:{" "}
                        <span style={{ color: "#20c997", fontWeight: "500" }}>
                          {check?.project?.category}
                        </span>
                        )
                      </div>
                    </label>
                  </div>

                  <form onSubmit={(e) => handleDelete(e, check.id)}>
                    <button
                      type="submit"
                      style={{
                        border: "none",
                        background: "transparent",
                        padding: 0,
                      }}
                    >
                      <i className="fa-solid fa-trash text-danger fs-5"></i>
                    </button>
                  </form>
                </div>
              </li>
            ))
          ) : (
            <li className="list-group-item py-3">
              <div className="form-check form-switch d-flex">
                {" "}
                <input className="form-check-input me-2" type="checkbox" />{" "}
                <label className="form-check-label">
                  Create a check to start the day
                </label>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Checks;

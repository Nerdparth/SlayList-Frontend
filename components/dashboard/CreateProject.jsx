import useCreateProject from "../../hooks/dashboard/dashboard";
import React, { useState } from "react";
import { toast } from "react-toastify";

const CreateProject = ({ handleProjectsChange }) => {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectCategory, setProjectCategory] = useState("");

  const { createProject, response, loading, error } = useCreateProject();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      createProject({ title: projectTitle, category: projectCategory });
      toast.success("Wohoo you just created a new project");
    } catch (err) {
      toast.error("There's an issue, please try again");
    }
    if (handleProjectsChange) handleProjectsChange();
    setProjectTitle("");
    setProjectCategory("");
  };

  return (
    <div
      className="modal fade"
      id="exampleModal2"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Create Project
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span
                  className="input-group-text border-2 border-secondary border-end-0"
                  style={{ backgroundColor: "#d6d6d6" }}
                  id="inputGroup-sizing-default"
                >
                  Title
                </span>
                <input
                  type="text"
                  className="form-control border-2 border-secondary border-start-0"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={(e) => setProjectTitle(e.target.value)}
                  value={projectTitle}
                  required
                />
              </div>

              <select
                value={projectCategory}
                className="form-select"
                onChange={(e) => {
                  setProjectCategory(e.target.value);
                }}
                aria-label="Default select example"
                required
              >
                <option value="" disabled>
                  Category
                </option>
                <option value="work">Work 🤑</option>
                <option value="health">Health ❤️‍🩹</option>
                <option value="study">Study 📚</option>
              </select>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? "creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;

import React, { useEffect, useState } from "react";
import useGetAllProjects from "../../hooks/projects/projects";
import useAddTask from "../../hooks/addTask/addTask";
import { toast } from "react-toastify";

const Form = () => {
  const { getProjects, projects, loading, error } = useGetAllProjects();
  const { addTask, addTaskResponse } = useAddTask();
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTask({
        title: title,
        priority: priority,
        project: project,
        description: description,
      });
      toast.success("Task added, Stay hard 🦍");
    } catch {
      ("Sorry, can't help you with task this time 😭");
    }
    console.log(addTaskResponse);
    setTitle("");
    setProject("");
    setPriority("");
    setDescription("");
  };

  useEffect(() => {
    getProjects();
  }, []);
  return (
    <>
      <p className="display-3 ms-3">Add Task</p>
      <div className="container-sm">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Title"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="mb-3">
            <textarea
              rows={7}
              cols={50}
              placeholder="Describe your Task"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
            />
          </div>
          <div className="row">
            <div className="col-6">
              <select
                value={project}
                className="form-select"
                onChange={(e) => setProject(e.target.value)}
                aria-label="Default select example"
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
            <div className="col-6">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="form-select"
                aria-label="Default select example"
                required
              >
                <option value="" disabled>
                  Priority
                </option>
                <option value="high" className="text-danger border">
                  High 🔴
                </option>
                <option value="medium" className="text-warning">
                  Medium 🟡
                </option>
                <option value="low" className="text-success">
                  Low 🟢
                </option>
              </select>
            </div>
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-outline-primary mt-5">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;

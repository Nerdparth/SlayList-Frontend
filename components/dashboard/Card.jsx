import { useEffect, useState } from "react";
import "../../src/App.css";
import { useUpdateTaskStatus, useDeleteTask } from "../../hooks/tasks/tasks";
import { toast } from "react-toastify";

const Card = (props) => {
  const [status, setStatus] = useState(props.status);
  const dateObject = new Date(props.started_at);
  const date = dateObject.getDate();
  const monthName = dateObject.toLocaleString("default", { month: "long" });
  const { updateTaskStatus } = useUpdateTaskStatus();
  const { deleteTask } = useDeleteTask();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTaskStatus(props.taskId, { status: status });
    props.updateTasks();
    toast.success("status updated for your task 🤌");
    document.getElementById(`closeModal-${props.taskId}`).click();
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    await deleteTask(props.taskId);
    props.updateTasks();
    document.getElementById(`closeModal-${props.taskId}`).click();
    toast.success("We removed your task 🧹")
  };

  return (
    <>
      <button
        data-bs-toggle="modal"
        data-bs-target={`#updateStatus-${props.taskId}`}
        className="card-body mx-2 bg-body  mb-3 text-start w-100"
        style={{
          border: "solid",
          borderColor: "#e6e4e9",
          borderRadius: 15,
          cursor: "pointer",
        }}
        onClick={() => console.log("Card clicked")} // or navigate to details
      >
        <div className="widget-49">
          <div className="widget-49-title-wrapper d-flex">
            <div
              className={`widget-49-date-primary bg-opacity-50 ${
                props.priority === "high"
                  ? "bg-danger"
                  : props.priority === "medium"
                    ? "bg-warning"
                    : "bg-primary"
              }`}
            >
              <span className="widget-49-date-day text-body">{date}</span>
              <span className="widget-49-date-month text-body">
                {monthName}
              </span>
            </div>
            <div className="widget-49-meeting-info ms-3">
              <span
                className=" d-block mt-3"
                style={{ fontSize: 18 }}
              >
                {props.title}
              </span>
              <span
                className="widget-49-pro-title text-secondary d-block"
                style={{ fontSize: 13 }}
              >
                {props.project}
              </span>
              <span
                className={`widget-49-meeting-time ${
                  props.priority === "high"
                    ? "text-danger"
                    : props.priority === "medium"
                      ? "text-warning"
                      : "text-primary"
                }`}
              >
                Priority: {props?.priority}{" "}
                <span className="text-primary">
                  {" "}
                  | Category: {props.category}
                </span>
              </span>
            </div>
          </div>
          <ol className="widget-49-meeting-points pb-3">
            <li className="widget-49-meeting-item list-unstyled">
              <span>{props.description}</span>
            </li>
          </ol>
        </div>
      </button>
      {/* update status modal */}

      <div
        className="modal fade"
        id={`updateStatus-${props.taskId}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Status
              </h1>
              <button
                type="button"
                id={`closeModal-${props.taskId}`}
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input me-3"
                    type="radio"
                    name="status"
                    role="switch"
                    id="not_started"
                    onChange={() => {
                      setStatus("not_started");
                    }}
                    checked={status === "not_started" ? true : false}
                  />
                  <label
                    className="form-check-label text-success"
                    for="not_started"
                  >
                    Not Started 🥹
                  </label>
                </div>

                <div className="form-check form-switch">
                  <input
                    className="form-check-input me-3"
                    type="radio"
                    name="status"
                    role="switch"
                    id="in_progress"
                    onChange={() => {
                      setStatus("in_progress");
                    }}
                    checked={status === "in_progress" ? true : false}
                  />
                  <label
                    className="form-check-label text-secondary"
                    for="in_progress"
                  >
                    In Progress ⚒️
                  </label>
                </div>

                <div className="form-check form-switch">
                  <input
                    className="form-check-input me-3"
                    type="radio"
                    name="status"
                    role="switch"
                    id="completed"
                    onChange={() => {
                      setStatus("completed");
                    }}
                    checked={status === "completed" ? true : false}
                  />
                  <label
                    className="form-check-label text-danger"
                    for="completed"
                  >
                    Completed 💯
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>

            <form onSubmit={handleDelete}>
              <button type="submit" className="btn btn-danger w-100 rounded-0">
                delete
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;

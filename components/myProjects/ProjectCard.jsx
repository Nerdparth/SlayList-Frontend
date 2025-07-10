import React, { useEffect } from "react";
import {
  useGetProjectAnalytics,
  useGetProjectById,
} from "../../hooks/projects/projects";
import { useParams } from "react-router-dom";
import useGetProjectTasks from "../../hooks/tasks/tasks";

const ProjectCard = () => {
  const { getProjectAnalytics, getProjectAnalyticsResponse } =
    useGetProjectAnalytics();
  const { getProjectById, getProjectByIdResponse } = useGetProjectById();
  const { getProjectTasks, getProjectTasksResponse } = useGetProjectTasks();
  const { projectid } = useParams();

  useEffect(() => {
    if (projectid) getProjectById(projectid);
  }, [projectid]);

  useEffect(() => {
    if (projectid) getProjectAnalytics(projectid);
  }, [projectid]);

  useEffect(() => {
    if (projectid) getProjectTasks(projectid);
  }, [projectid]);

  console.log(getProjectTasksResponse);

  return (
    <div>
      <p className="h4">
        <i className="fa-solid fa-folder mx-3"></i>{" "}
        {getProjectByIdResponse?.title}
      </p>
      <p className="text-secondary ms-3">
        category: {getProjectByIdResponse?.category}
      </p>
      <div className="row ms-3 me-4 my-5">
        <div className="col-3">
          <div className="card">
            <div className="card-body">
              <h5
                className="card-title text-secondary mb-4"
                style={{ fontSize: 16 }}
              >
                Tasks Completed
              </h5>
              <h6 className="card-subtitle mb-4" style={{ fontSize: 25 }}>
                {getProjectAnalyticsResponse?.completed_tasks_count}/
                <span style={{ fontSize: 20 }}>
                  {getProjectAnalyticsResponse?.tasks_count}
                </span>
              </h6>
              <p className="card-text" >
                Since {getProjectByIdResponse?.starting_month}
              </p>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="card">
            <div className="card-body">
              <h5
                className="card-title text-secondary mb-4"
                style={{ fontSize: 16 }}
              >
                Average Time/Task
              </h5>
              <h6 className="card-subtitle mb-4" style={{ fontSize: 25 }}>
                {getProjectAnalyticsResponse?.average_time_per_task}
                <span className="text-secondary" style={{ fontSize: 13 }}>
                  {" "}
                  hours
                </span>
              </h6>
              <p className="card-text">
                Since {getProjectByIdResponse?.starting_month}
              </p>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="card">
            <div className="card-body">
              <h5
                className="card-title text-secondary mb-4"
                style={{ fontSize: 16 }}
              >
                Average Tasks/day
              </h5>
              <h6 className="card-subtitle mb-4" style={{ fontSize: 25 }}>
                {getProjectAnalyticsResponse?.average_tasks_per_day} Tasks /
                <span style={{ fontSize: 20 }}> Day</span>
              </h6>
              <p className="card-text" >
                Since {getProjectByIdResponse?.starting_month}
              </p>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="card">
            <div className="card-body">
              <h5
                className="card-title text-secondary mb-4"
                style={{ fontSize: 16 }}
              >
                Time Since Project
              </h5>
              <h6 className="card-subtitle mb-4" style={{ fontSize: 25 }}>
                {getProjectAnalyticsResponse?.days_since_creation} Days /
                <span style={{ fontSize: 20 }}>
                  {" "}
                  {getProjectAnalyticsResponse?.hours_since_creation} hours
                </span>
              </h6>
              <p className="card-text" >
                Since {getProjectByIdResponse?.starting_month}
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="h4 mb-4">
        <i
          className="fa-solid fa-list-check mx-3"
          
        ></i>{" "}
        Project Tasks
      </p>
      {getProjectTasksResponse && getProjectTasksResponse != 0 ? (
        getProjectTasksResponse.map((task) => (
          <div key={task.id} className="card mx-auto col-11 my-4">
            <div
              className={`card-body text-start btn btn-outline-${task.status == `not_started` ? `danger` : task.status == `completed` ? `success` : `warning`} d-flex justify-content-between rounded opacity-50`}
            >
              <span className="fw-medium lead">{task?.title}</span>
              <span className="fw-medium lead text-body">
                ({task?.status})
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="card mx-auto col-11 my-4">
          <div className="card-body text-start btn btn-outline-light/dark d-flex justify-content-between rounded opacity-50">
            <span className="fw-medium lead">
              Add a task to start with this project
            </span>
            <span className="fw-medium lead text-body">
              <i className="fa-solid fa-trash"></i>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGetAllProjects from "../../hooks/projects/projects";
import { useLocation } from "react-router-dom";

const Sidebar = ({ projectsChanged }) => {
  const { getProjects, projects, loading, error } = useGetAllProjects();
  const currentPage = useLocation();

  const url = currentPage.pathname;

  useEffect(() => {
    getProjects();
  }, [projectsChanged]);

  return (
    <div
      className={`offcanvas offcanvas-start ${screen.width > 550 ? `show` : `d-none`}`}
      style={screen.width > 550 ? { width: 250 } : {}}
      data-bs-scroll="true"
      data-bs-backdrop="false"
      tabIndex="0"
      id="offcanvasScrolling"
      aria-labelledby="offcanvasScrollingLabel"
    >
      <div className="offcanvas-header">
        <i className="fa-solid fa-clipboard-check text-secondary me-4 ms-2 h2"></i>
        <p className="display-5">Slaylist</p>
      </div>
      <div className="offcanvas-body">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <img
              src="../../src/assets/default.png"
              alt="profile photo"
              style={{ width: 50 }}
            />
            <p className="mx-3" style={{ display: "inline" }}>
              <Link to="profile/" className="text-decoration-none text-body">
                Profile
              </Link>
            </p>
          </li>
          <li className="list-group-item py-3">
            <i
              className={`fa-solid fa-house me-3 ms-3 text-${url === "/" ? `primary` : `body`}`}
            ></i>
            <Link
              to="/"
              className={`text-decoration-none text-${url === "/" ? `primary` : `body`} `}
            >
              Home
            </Link>
          </li>
          <li className="list-group-item py-3">
            <i
              className={`fa-solid fa-bars-progress me-3 ms-3 text-${url === "/checks" ? `primary` : `body`}`}
            ></i>
            <Link
              to="/checks"
              className={`text-decoration-none text-${url === "/checks" ? `primary` : `body`}`}
            >
              Checks
            </Link>
          </li>
          <li className="list-group-item py-3">
            <i
              className={`fa-solid fa-user-plus text-${url === "/add-task/" ? `primary` : `body`} fw-bold me-3 ms-3`}
            ></i>
            <Link
              to="add-task/"
              className={`text-decoration-none text-${url === "/add-task/" ? `primary` : `body`}`}
            >
              Add Task
            </Link>
          </li>
          <li className="list-group-item py-3">
            <i className="fa-solid fa-briefcase ms-3 me-2"></i>
            <div className="dropdown" style={{ display: "inline" }}>
              <button
                className={`btn btn-sm dropdown-toggle text-${url.includes("/my-projects") ? `primary` : `body`}`}
                type="button"
                data-bs-toggle="dropdown"
              >
                <span className="fw-normal" style={{ fontSize: 15 }}>
                  My Projects
                </span>
              </button>
              <ul className="dropdown-menu">
                {projects && projects.length != 0 ? (
                  projects.map((project) => (
                    <li key={project.id}>
                      <Link
                        to={`my-projects/${project.id}`}
                        className="dropdown-item"
                      >
                        {project.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>
                    <p className="dropdown-item text-body">
                      No Projects to show
                    </p>
                  </li>
                )}
              </ul>
            </div>
          </li>
          <li className="list-group-item py-3">
            <i
              className={`fa-solid fa-heart text-${url === "/personal/" ? `primary` : `body`} me-3 ms-3`}
            ></i>
            <Link
              to="personal/"
              className={`text-decoration-none text-${url === "/personal/" ? `primary` : `body`}`}
            >
              Personal
            </Link>
          </li>
        </ul>
        <div className="fixed-bottom my-5 mx-5" style={{ zIndex: 0 }}>
          <button
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            style={{ width: 150 }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

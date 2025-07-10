import React from "react";
import { logout } from "../hooks/auth/logout";
import { useNavigate } from "react-router-dom";

const Modal = () => {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    document.getElementById("closeLogoutModal").click();
    navigate("/login");
  };
  return (
    <div
      className="modal"
      id="exampleModal"
      data-bs-backdrop="true"
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title text-danger">Logout</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>
              Are you Sure you want to{" "}
              <span className="text-danger">Logout?</span>
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              id="closeLogoutModal"
            >
              Close
            </button>
            <form onSubmit={handleLogout}>
              <button type="submit" className="btn btn-danger">
                Yes Proceed
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

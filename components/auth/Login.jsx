import React, { useEffect, useState } from "react";
import useLogIn from "../../hooks/auth/login";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { login, logInResponse } = useLogIn();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ username: userName, password: password });

    setPassword("");
  };

  useEffect(() => {
    if (!logInResponse) {
      return;
    }
    if (logInResponse === 400) {
      toast.error("wrong username or password");
      return;
    } else {
      toast.success("Welcome Back Buddy, we missed your hardwork");
      navigate("/");
    }
  }, [logInResponse]);

  return (
    <div
      className="row justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="col-7 justify-content-center align-items-center">
        <div>
          <p className="display-3">
            <span className="text-secondary" style={{ fontSize: 29 }}>
              Login To
            </span>{" "}
            Slaylist
          </p>
        </div>
        <form className="justify-content-center" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username"
            className="form-control mb-3 w-100"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            className="w-100 form-control mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit"  className={`w-25 btn btn-${localStorage.getItem("theme") === "dark" ? `light` : `dark`}`}>
            login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

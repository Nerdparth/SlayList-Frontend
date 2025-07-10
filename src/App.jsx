import { ToastContainer } from "react-toastify";
import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardTasks from "../components/dashboard/DashboardTasks";
import Search from "../components/dashboard/Search";
import Navbar from "../components/dashboard/Navbar";
import Form from "../components/addTask/form";
import Checks from "../components/checks/Checks";
import ProjectCard from "../components/myProjects/ProjectCard";
import WriteDown from "../components/personal/writeDown";
import Profile from "../components/profile/profile";
import Modal from "../components/Modal";
import "react-toastify/dist/ReactToastify.css";
import Signup from "../components/auth/Signup";
import Login from "../components/auth/Login";
import ProtectedRoute from "../components/auth/ProtectedRoute";

function App() {
  const [projectsChanged, setProjectsChanged] = useState(false);
  const location = useLocation();
  const isSignUpRoute = location.pathname === "/signup";
  const isLogInRoute = location.pathname === "/login";

  const handleProjectsChange = () => {
    setProjectsChanged((prev) => !prev);
  };
  if (isSignUpRoute) {
    return (
      <>
        <Routes>
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <ToastContainer />
      </>
    );
  }

  if (isLogInRoute) {
    return (
      <>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <ToastContainer />
      </>
    );
  }
  return (
    <>
      <Navbar />
      <div className="row">
        <div className={screen.width > 550 ? "col-2" : ""}>
          {" "}
          <Sidebar projectsChanged={projectsChanged} />
        </div>
        <Modal />
        <div className={screen.width > 550 ? "col-10" : "col-12"}>
          <Search />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardTasks handleProjectsChange={handleProjectsChange} />
                </ProtectedRoute>
              }
            />

            <Route
              path="add-task/"
              element={
                <ProtectedRoute>
                  <Form />
                </ProtectedRoute>
              }
            />
            <Route
              path="checks/"
              element={
                <ProtectedRoute>
                  <Checks />
                </ProtectedRoute>
              }
            />
            <Route
              path="my-projects/:projectid"
              element={
                <ProtectedRoute>
                  <ProjectCard />
                </ProtectedRoute>
              }
            />
            <Route
              path="personal/"
              element={
                <ProtectedRoute>
                  <WriteDown />
                </ProtectedRoute>
              }
            />
            <Route
              path="profile/"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;

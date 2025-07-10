import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [time, setTime] = useState(" ");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.setAttribute("data-bs-theme", savedTheme);
    setIsDark(savedTheme === "dark");
  }
}, []);

const toggleTheme = () => {
  const newTheme = isDark ? "light" : "dark";
  document.documentElement.setAttribute("data-bs-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  setIsDark(!isDark);
};

  useEffect(() => {
    const updateClock = () => {
      const d = new Date();
      const hour = d.getHours().toString().padStart(2, "0");
      const minute = d.getMinutes().toString().padStart(2, "0");
      const second = d.getSeconds().toString().padStart(2, "0");
      let currentTime = hour + ":" + minute + ":" + second;
      setTime(currentTime);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
  }, []);

  return (
    <nav className="navbar shadow-sm" style={{ marginBottom: 25 }}>
      <div className="container-fluid">
        <a href=""></a>
        <div>
          <button className="rounded-circle me-5" onClick={toggleTheme} style={{width : 40, height: 40}}>{isDark? <i style={{fontSize: 20}} className="fa-solid fa-moon"></i> : <i style={{fontSize: 20}} className="fa-solid fa-sun"></i>}</button>
        <a className="navbar-brand" href="#">
          {time}
        </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

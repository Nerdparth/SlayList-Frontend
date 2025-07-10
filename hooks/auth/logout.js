export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};

export const checkLogout = () => {
  const access = localStorage.getItem("access");
  if (!access) {
    return false;
  }
  return true;
};

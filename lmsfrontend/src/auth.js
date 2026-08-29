export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("role");
  localStorage.removeItem("name");
};

export const isAuthenticated = () => Boolean(localStorage.getItem("token"));

export const getRole = () => localStorage.getItem("role");

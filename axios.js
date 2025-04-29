import axios from "axios";

// Set the base URL for all axios requests
axios.defaults.baseURL = "http://localhost:4000";

// Add response interceptor for handling 401 errors
axios.interceptors.response.use(
  function (response) {
    console.log("Response:", response);
    return response;
  },
  function (error) {
    console.error("Error:", error);
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");
      delete axios.defaults.headers.common.Authorization;
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

// Configure default headers
axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "_xsrf";

// axios.defaults

export default axios;

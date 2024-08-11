import axios from "axios";


if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://127.0.0.1:8000/";
} else {
  axios.defaults.baseURL = "http://127.0.0.1:8000/";
}
axios.defaults.baseURL = "http://127.0.0.1:5000/";

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status === 401) {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('username')
    delete axios.defaults.headers.common.Authorization
    window.location.reload();
  }
  return Promise.reject(error);
});


axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "_xsrf";

// axios.defaults

export default axios;

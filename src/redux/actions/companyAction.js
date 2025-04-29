import axios from "../../../axios";
import { showSnackBar } from "./snackbarAction";

export const COMPANY = "COMPANY";
export const ADDCOMPANY = "ADDCOMPANY";
export const DELETECOMPANY = "DELETECOMPANY";
export const UPDATECOMPANY = "UPDATECOMPANY";

export function getAllCompany() {
  return (dispatch) => {
    axios
      .get("api/company")
      .then((res) => {
        dispatch({
          type: COMPANY,
          payload: res.data.allCompany,
        });
      })
      .catch((error) => {
        const errorMsg =
          error.response?.data?.errors?.[0]?.msg ||
          "Failed to fetch companies.";
        dispatch(showSnackBar(errorMsg, "error"));
      });
  };
}

export function addNewCompany(data) {
  return (dispatch) => {
    axios
      .post("api/company/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        dispatch(getAllCompany());
        dispatch({
          type: ADDCOMPANY,
          payload: res.data,
        });
        dispatch(showSnackBar("Added New Company Successfully!", "success"));
      })
      .catch((error) => {
        console.error("Error in addNewCompany:", error);
        dispatch(
          showSnackBar(
            error.response?.data?.message || "Failed to add company",
            "error"
          )
        );
      });
  };
}

export function deleteCompany(id) {
  return (dispatch) => {
    axios
      .delete(`api/company/${id}`)
      .then((res) => {
        dispatch(getAllCompany());
        dispatch({
          type: DELETECOMPANY,
          payload: res.data,
        });
        dispatch(showSnackBar("Deleted Company Successfully!", "success"));
      })
      .catch((error) => {
        const errorMsg =
          error.response?.data?.errors?.[0]?.msg || "Failed to delete company.";
        dispatch(showSnackBar(errorMsg, "error"));
      });
  };
}

export function updateCompany(id, data) {
  return (dispatch) => {
    axios
      .patch(`api/company/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("Update response:", res.data);
        dispatch(getAllCompany());
        dispatch({
          type: UPDATECOMPANY,
          payload: res.data,
        });
        dispatch(showSnackBar("Updated Company Successfully!", "success"));
      })
      .catch((error) => {
        console.error("Update error:", error);
        const errorMsg =
          error.response?.data?.errors?.[0]?.msg || "Failed to update company.";
        dispatch(showSnackBar(errorMsg, "error"));
      });
  };
}

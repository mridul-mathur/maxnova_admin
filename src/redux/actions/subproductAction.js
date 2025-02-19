import axios from "../../../axios";
import { showSnackBar } from "./snackbarAction";

export const SUBPRODUCT = "SUBPRODUCT";
export const ADDSUBPRODUCT = "ADDSUBPRODUCT";
export const DELETESUBPRODUCT = "DELETESUBPRODUCT";
export const UPDATESUBPRODUCT = "UPDATESUBPRODUCT";

export function getAllSubproducts() {
  return (dispatch) => {
    axios
      .get("api/subproduct")
      .then((res) => {
        dispatch({
          type: SUBPRODUCT,
          payload: res.data.subproducts,
        });
      })
      .catch((error) => {
        dispatch(
          showSnackBar(
            error.response?.data?.errors?.[0]?.msg ||
              "Error fetching subproducts",
            "error"
          )
        );
      });
  };
}

export function addNewSubproduct(data) {
  return (dispatch) => {
    axios
      .post("api/subproduct/add", data)
      .then((res) => {
        dispatch(getAllSubproducts());
        dispatch({
          type: ADDSUBPRODUCT,
          payload: res.data,
        });
        dispatch(showSnackBar("Added New Subproduct Successfully!", "success"));
      })
      .catch((error) => {
        dispatch(
          showSnackBar(
            error.response?.data?.errors?.[0]?.msg || "Error adding subproduct",
            "error"
          )
        );
      });
  };
}

export function deleteSubproduct(id) {
  return (dispatch) => {
    axios
      .delete(`api/subproduct/${id}`)
      .then((res) => {
        dispatch(getAllSubproducts());
        dispatch({
          type: DELETESUBPRODUCT,
          payload: res.data,
        });
        dispatch(showSnackBar("Deleted Subproduct Successfully!", "success"));
      })
      .catch((error) => {
        dispatch(
          showSnackBar(
            error.response?.data?.errors?.[0]?.msg ||
              "Error deleting subproduct",
            "error"
          )
        );
      });
  };
}

export function updateSubproduct(id, data) {
  return (dispatch) => {
    axios
      .patch(`api/subproduct/${id}`, data)
      .then((res) => {
        dispatch(getAllSubproducts());
        dispatch({
          type: UPDATESUBPRODUCT,
          payload: res.data,
        });
        dispatch(showSnackBar("Updated Subproduct Successfully!", "success"));
      })
      .catch((error) => {
        dispatch(
          showSnackBar(
            error.response?.data?.errors?.[0]?.msg ||
              "Error updating subproduct",
            "error"
          )
        );
      });
  };
}

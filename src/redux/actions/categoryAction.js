import axios from "../../../axios";
import { showSnackBar } from "./snackbarAction";

export const CATEGORY = "CATEGORY";
export const ADDCATEGORY = "ADDCATEGORY";
export const DELETECATEGORY = "DELETECATEGORY";
export const UPDATECATEGORY = "UPDATECATEGORY";

export function getAllCategory() {
  return (dispatch) => {
    axios
      .get("api/category")
      .then((res) => {
        dispatch({
          type: CATEGORY,
          payload: res.data.allCategory,
        });
      })
      .catch((error) => {
        dispatch(showSnackBar(error.response.data.errors[0].msg, "error"));
      });
  };
}

export function addNewCategory(data) {
  return (dispatch) => {
    axios
      .post("api/category/add", data)
      .then((res) => {
        dispatch(getAllCategory());
        dispatch({
          type: ADDCATEGORY,
          payload: res.data,
        });
        dispatch(showSnackBar("Added New Category Successfully!", "success"));
      })
      .catch((error) => {
        dispatch(showSnackBar(error.response.data.errors[0].msg, "error"));
      });
  };
}

export function deleteCategory(id) {
  return (dispatch) => {
    axios
      .delete(`api/category/${id}`)
      .then((res) => {
        dispatch(getAllCategory());
        dispatch({
          type: DELETECATEGORY,
          payload: res.data,
        });
        dispatch(showSnackBar("Deleted Category Successfully!", "success"));
      })
      .catch((error) => {
        dispatch(showSnackBar(error.response.data.errors[0].msg, "error"));
      });
  };
}

export function updateCategory(id, data) {
  return (dispatch) => {
    axios
      .patch(`api/category/${id}`, data)
      .then((res) => {
        dispatch(getAllCategory());
        dispatch({
          type: UPDATECATEGORY,
          payload: res.data,
        });
        dispatch(showSnackBar("Updated Category Successfully!", "success"));
      })
      .catch((error) => {
        dispatch(showSnackBar(error.response.data.errors[0].msg, "error"));
      });
  };
}

import axios from "../../../axios";
import { showSnackBar } from "./snackbarAction";

export const SUBCATEGORY = "SUBCATEGORY";
export const ADDSUBCATEGORY = "ADDSUBCATEGORY";
export const DELETESUBCATEGORY = "DELETESUBCATEGORY";

export function getAllSubcategories() {
  return (dispatch) => {
    axios
      .get("api/subcategory")
      .then((res) => {
        dispatch({
          type: SUBCATEGORY,
          payload: res.data.subcategories,
        });
      })
      .catch((error) => {
        dispatch(showSnackBar(error.response.data.errors[0].msg, "error"));
      });
  };
}

export function addNewSubcategory(data) {
  return (dispatch) => {
    axios
      .post("api/subcategory/add", data)
      .then((res) => {
        dispatch(getAllSubcategories());
        dispatch({
          type: ADDSUBCATEGORY,
          payload: res.data,
        });
        dispatch(
          showSnackBar("Added New Subcategory Successfully!", "success")
        );
      })
      .catch((error) => {
        dispatch(showSnackBar(error.response.data.errors[0].msg, "error"));
      });
  };
}

export function deleteSubcategory(id) {
  return (dispatch) => {
    axios
      .delete(`api/subcategory/${id}`)
      .then((res) => {
        dispatch(getAllSubcategories());
        dispatch({
          type: DELETESUBCATEGORY,
          payload: res.data,
        });
        dispatch(showSnackBar("Deleted Subcategory Successfully!", "success"));
      })
      .catch((error) => {
        dispatch(showSnackBar(error.response.data.errors[0].msg, "error"));
      });
  };
}

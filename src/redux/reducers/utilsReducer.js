import {
  GETPCDUTIL,
  GETPVTUTIL,
  GETHOMEUTIL,
  GETABOUTUTIL,
  GETBENTOUTIL,
  GETCUSTOMUTIL,
  PATCHHOMEUTIL,
  UPDATEPCDUTIL,
  UPDATEPVTUTIL,
  ADDCERTIFICATE,
  GETCERTIFICATE,
  UPDATEBENTOUTIL,
  UPDATEABOUTUTIL,
  UPDATECUSTOMUTIL,
  DELETECERTIFICATE,
} from "../actions/utilsAction";

export const REQUEST_STARTED = "REQUEST_STARTED";
export const REQUEST_FAILED = "REQUEST_FAILED";
export const CLEAR_ERROR = "CLEAR_ERROR";
const initialState = {
  homeutil: null,
  pcdutil: null,
  pvtutil: null,
  customutil: null,
  aboututil: null,
  bentoutil: null,
  certificates: null,
  loading: false,
  error: null,
  success: null,
};
export const utilsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_STARTED:
      return { ...state, loading: true, error: null, success: null };
    case REQUEST_FAILED:
      return { ...state, loading: false, error: action.payload };
    case CLEAR_ERROR:
      return { ...state, error: null, success: null };
    case GETHOMEUTIL:
      return { ...state, homeutil: action.payload, loading: false };
    case GETPCDUTIL:
      return { ...state, pcdutil: action.payload, loading: false };
    case GETPVTUTIL:
      return { ...state, pvtutil: action.payload, loading: false };
    case GETCUSTOMUTIL:
      return { ...state, customutil: action.payload, loading: false };
    case GETABOUTUTIL:
      return { ...state, aboututil: action.payload, loading: false };
    case GETBENTOUTIL:
      return { ...state, bentoutil: action.payload, loading: false };
    case GETCERTIFICATE:
      return { ...state, certificates: action.payload, loading: false };
    case PATCHHOMEUTIL:
      return {
        ...state,
        loading: false,
        success: "Home utility updated successfully",
      };
    case UPDATEPCDUTIL:
      return {
        ...state,
        loading: false,
        success: "PCD utility updated successfully",
      };
    case UPDATEPVTUTIL:
      return {
        ...state,
        loading: false,
        success: "PVT utility updated successfully",
      };
    case UPDATECUSTOMUTIL:
      return {
        ...state,
        loading: false,
        success: "Custom utility updated successfully",
      };
    case UPDATEABOUTUTIL:
      return {
        ...state,
        loading: false,
        success: "About utility updated successfully",
      };
    case UPDATEBENTOUTIL:
      return {
        ...state,
        loading: false,
        success: "Bento utility updated successfully",
        ...(action.payload && { bentoutil: action.payload }),
      };
    case ADDCERTIFICATE:
      return {
        ...state,
        loading: false,
        success: "Certificate added successfully",
        certificates: state.certificates
          ? [...state.certificates, action.payload]
          : [action.payload],
      };
    case DELETECERTIFICATE:
      return {
        ...state,
        loading: false,
        success: "Certificate deleted successfully",
        certificates: state.certificates?.filter(
          (cert) => cert._id !== action.payload
        ),
      };
    default:
      return state;
  }
};

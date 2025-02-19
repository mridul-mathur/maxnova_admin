import {
  SUBCATEGORY,
  ADDSUBCATEGORY,
  DELETESUBCATEGORY,
} from "../actions/subcategoryAction";

const initialState = {
  allsubcategories: null,
};

export const subcategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBCATEGORY: {
      return {
        ...state,
        allsubcategories: action.payload,
      };
    }
    case ADDSUBCATEGORY: {
      return {
        ...state,
      };
    }
    case DELETESUBCATEGORY: {
      return {
        ...state,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

import { configureStore } from "@reduxjs/toolkit";

import { utilsReducer } from "./reducers/utilsReducer";
import { productReducer } from "./reducers/productReducer";
import { companyReducer } from "./reducers/companyReducer";
import { categoryReducer } from "./reducers/categoryReducer";
import { snackBarReducer } from "./reducers/snackbarReducer";
import { subproductReducer } from "./reducers/subproductReducer";
import { subcategoryReducer } from "./reducers/subcategoryReducer";

export const store = configureStore({
  reducer: {
    products: productReducer,
    company: companyReducer,
    category: categoryReducer,
    subcategory: subcategoryReducer,
    subproduct: subproductReducer,
    utils: utilsReducer,
    snackbar: snackBarReducer,
  },
});

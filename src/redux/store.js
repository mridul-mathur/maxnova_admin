import { configureStore } from "@reduxjs/toolkit";

import { productReducer } from "./reducers/productReducer";
import { companyReducer } from "./reducers/companyReducer";
import { categoryReducer } from "./reducers/categoryReducer";
import { snackBarReducer } from "./reducers/snackbarReducer";

export const store = configureStore({
    reducer: {
        products: productReducer,
        company: companyReducer,
        category: categoryReducer,
        snackbar: snackBarReducer
    }
})
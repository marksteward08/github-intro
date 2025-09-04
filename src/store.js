import customerReducer from "./features/customers/customerSlice";
import bankReducer from "./features/accounts/accountSlice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    bank: bankReducer,
    customer: customerReducer,
  },
});

export default store;

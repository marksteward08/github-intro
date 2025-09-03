import { createStore, combineReducers } from "redux";
import customerReducer from "./features/customers/customerSlice";
import bankReducer from "./features/accounts/accountSlice";

const rootReducer = combineReducers({
  bank: bankReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

export default store;

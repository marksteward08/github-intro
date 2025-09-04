import { createStore, combineReducers, applyMiddleware } from "redux";
import customerReducer from "./features/customers/customerSlice";
import bankReducer from "./features/accounts/accountSlice";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  bank: bankReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

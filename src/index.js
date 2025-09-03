import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./store";
import { deposit } from "./features/accounts/accountSlice";
import { createCustomer } from "./features/customers/customerSlice";

store.dispatch(deposit(200));
console.log(store.getState());

store.dispatch(createCustomer("Mark Steward", "1093213"));
console.log(store.getState());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

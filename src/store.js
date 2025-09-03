import { createStore } from "redux";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "account/requestLoan":
      if (state.loan > 0) return state;

      const { amount, purpose } = action.payload;

      return {
        ...state,
        loan: state.loan + amount,
        loanPurpose: purpose,
        balance: state.balance + amount,
      };
    case "account/repayLoan":
      if (state.loan === 0) return state;
      return {
        ...state,
        loanPurpose: "",
        loan: 0,
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

store.dispatch({ type: "account/deposit", payload: 100 });

console.log(store.getState());

store.dispatch({ type: "account/withdraw", payload: 50 });

console.log(store.getState());

store.dispatch({
  type: "account/requestLoan",
  payload: { amount: 100, purpose: "Home Renovation" },
});

console.log(store.getState());

store.dispatch({ type: "account/repayLoan" });

console.log(store.getState());

// action creators

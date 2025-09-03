import { createStore, combineReducers } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: null,
};

function bankReducer(state = initialStateAccount, action) {
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

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/create":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  bank: bankReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

// store.dispatch({ type: "account/deposit", payload: 100 });

// console.log(store.getState());

// store.dispatch({ type: "account/withdraw", payload: 50 });

// console.log(store.getState());

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 100, purpose: "Home Renovation" },
// });

// console.log(store.getState());

// store.dispatch({ type: "account/repayLoan" });

// console.log(store.getState());

// action creators
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}

function repayLoan() {
  return { type: "account/repayLoan" };
}

store.dispatch(deposit(100));
console.log(store.getState());

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/create",
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString().slice(0, 10),
    },
  };
}

store.dispatch(createCustomer("John Doe", "123456789"));
console.log(store.getState());

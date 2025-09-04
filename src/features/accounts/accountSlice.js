import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        if (state.loan > 0) return;

        const { amount, purpose } = action.payload;
        state.loan += amount;
        state.loanPurpose = purpose;
        state.balance += amount;
      },
    },
    repayLoan(state) {
      if (state.loan === 0) return;
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },

    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export default accountSlice.reducer;
export const { withdraw, requestLoan, repayLoan } = accountSlice.actions;

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  // THIS IS THUNKS - with thunks, you can return a function in every action creator. There, you can perform async operations such as API calls.
  return async function (dispatch, getState) {
    // you can dispatch as you please in thunks
    dispatch({ type: "account/convertingCurrency" });

    const response = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await response.json();
    const convertedAmount = data.rates.USD;
    dispatch({ type: "account/deposit", payload: convertedAmount });
  };
}

/*
export default function bankReducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
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
    case "account/convertingCurrency":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

// action creators
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  // THIS IS THUNKS - with thunks, you can return a function in every action creator. There, you can perform async operations such as API calls.
  return async function (dispatch, getState) {
    // you can dispatch as you please in thunks
    dispatch({ type: "account/convertingCurrency" });

    const response = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await response.json();
    const convertedAmount = data.rates.USD;
    dispatch({ type: "account/deposit", payload: convertedAmount });
  };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}

export function repayLoan() {
  return { type: "account/repayLoan" };
}
*/

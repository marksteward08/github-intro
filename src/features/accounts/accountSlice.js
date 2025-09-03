const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

export default function bankReducer(state = initialStateAccount, action) {
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

// action creators
export function deposit(amount) {
  return { type: "account/deposit", payload: amount };
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

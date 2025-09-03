export default function customerReducer(state = initialStateCustomer, action) {
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

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: null,
};

export function createCustomer(fullName, nationalID) {
  return {
    type: "customer/create",
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString().slice(0, 10),
    },
  };
}

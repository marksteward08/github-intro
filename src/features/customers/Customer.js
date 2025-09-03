import { useSelector } from "react-redux";

function Customer() {
  const selector = useSelector((store) => store.customer);
  return <h2>👋 Welcome, {selector.fullName}</h2>;
}

export default Customer;

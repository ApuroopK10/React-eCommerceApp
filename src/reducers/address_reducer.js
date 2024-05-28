import { ADD_BILLING_ADDRESS, ADD_SHIPPING_ADDRESS } from "../actions";

const address_reducer = (state, action) => {
  if (action.type === ADD_SHIPPING_ADDRESS) {
    return { ...state, shippingAddress: { ...action.payload } };
  }
  if (action.type === ADD_BILLING_ADDRESS) {
    return { ...state, billingAddress: { ...action.payload } };
  }
  return { ...state };
};

export default address_reducer;

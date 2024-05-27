import React, { createContext, useContext, useReducer } from "react";
import reducer from "../reducers/address_reducer";
import { ADD_SHIPPING_ADDRESS, ADD_BILLING_ADDRESS } from "../actions";

const initialState = {
  shippingAddress: {},
  billingAddress: {},
};

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const addShippingAddress = (address) => {
    dispatch({
      type: ADD_SHIPPING_ADDRESS,
      payload: address,
    });
  };
  return (
    <AddressContext.Provider value={{ ...state, addShippingAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddressContext = () => {
  return useContext(AddressContext);
};

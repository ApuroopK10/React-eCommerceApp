import React from "react";
import styled from "styled-components";

const ShippingAddress = () => {
  return (
    <Wrapper>
      <h1>Shipping Address</h1>
      <p>* indicates the field is required</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: block;
`;

export default ShippingAddress;

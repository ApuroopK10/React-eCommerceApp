import React from "react";
import ShippingAddress from "../components/ShippingAddress";
import BillingAddress from "../components/BillingAddress";
import styled from "styled-components";
import { PageHero } from "../components";
import CartTotals from "../components/CartTotals";
import { useAddressContext } from "../context/address_context";

const ShippingPage = () => {
  const { shippingAddress } = useAddressContext();
  const isShippingAdded = Object.keys(shippingAddress).length > 0;
  return (
    <main>
      <PageHero title="Shipping" />
      <Wrapper className="page section section-center">
        {!isShippingAdded ? <ShippingAddress /> : <BillingAddress />}
        <CartTotals />
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 5rem;
  justify-items: center;

  .empty {
    text-align: center;
  }

  h2 {
    margin-bottom: 1.5rem;
  }

  &.page {
    justify-content: center;
  }
`;

export default ShippingPage;

import React from "react";
import styled from "styled-components";
import { PageHero, StripeCheckout } from "../components";
// extra imports
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const { cart } = useCartContext();
  return (
    <main>
      <PageHero title="Checkout" />
      <Wrapper className="page section section-center">
        {cart.length === 0 ? (
          <div className="empty">
            <h2>Your cart is empty</h2>
            <Link to="/products" className="btn">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <StripeCheckout />
        )}
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
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
export default CheckoutPage;

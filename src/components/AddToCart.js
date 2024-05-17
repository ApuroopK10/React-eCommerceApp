import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";
import AmountButtons from "./AmountButtons";

const AddToCart = ({ product }) => {
  const { stock, id, colors } = product;
  const { addToCart } = useCartContext();
  const [activeColor, setActiveColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);
  const addQuantity = () => {
    if (quantity === stock) {
      return;
    }
    setQuantity(quantity + 1);
  };
  const reduceQuantity = () => {
    if (quantity === 1) {
      return;
    }
    setQuantity(quantity - 1);
  };
  return (
    <Wrapper>
      <div className="colors">
        <span>Colors: </span>
        <div>
          {colors.map((color, idx) => (
            <button
              onClick={() => setActiveColor(colors[idx])}
              key={idx}
              className={`color-btn ${activeColor === color ? "active" : ""}`}
              style={{ background: color }}
            >
              {activeColor === color && <FaCheck />}
            </button>
          ))}
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons
          quantity={quantity}
          plusQuantity={addQuantity}
          minusQuantity={reduceQuantity}
        />
      </div>
      <Link
        to="/cart"
        className="btn"
        onClick={() => addToCart(id, activeColor, quantity, product)}
      >
        Add to Cart
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.8;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;
export default AddToCart;

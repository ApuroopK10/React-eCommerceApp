import React from "react";
import styled from "styled-components";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
const Stars = ({ rating, reviews }) => {
  const ratings = [];
  if (rating % 5 === 0) {
    for (let i = 0; i < 5; i++) {
      ratings.push(
        parseInt(rating) === 0 ? (
          <span key={i + "empty"}>
            <BsStar />
          </span>
        ) : (
          <span key={i + "full"}>
            <BsStarFill />
          </span>
        )
      );
    }
  } else {
    for (let i = 0; i < Math.floor(rating); i++) {
      ratings.push(
        <span key={i}>
          <BsStarFill />
        </span>
      );
    }
    if (rating - Math.floor(rating) >= 0.5) {
      ratings.push(
        <span key={rating - Math.floor(rating)}>
          <BsStarHalf />
        </span>
      );
    } else {
      ratings.push(
        <span key={rating - Math.floor(rating)}>
          <BsStar />
        </span>
      );
    }
    for (let i = Math.ceil(rating); i < 5; i++) {
      ratings.push(
        <span key={i}>
          <BsStar />
        </span>
      );
    }
  }

  return (
    <Wrapper>
      <div className="stars">
        <span>{ratings}</span>
      </div>
      <p className="reviews">({reviews} customer reviews)</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;
export default Stars;

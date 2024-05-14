import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filtered_products: products, grid_view } = useFilterContext();
  if (products.length === 0) {
    return <h5>Sorry, no Products matched your search...</h5>;
  }
  return !grid_view ? (
    <ListView products={products}> </ListView>
  ) : (
    <GridView products={products}> </GridView>
  );
};
export default ProductList;

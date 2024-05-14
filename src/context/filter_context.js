import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: "price-lowest",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products } = useProductsContext();
  useEffect(() => {
    dispatch({
      type: LOAD_PRODUCTS,
      payload: products,
    });
  }, [products]);

  useEffect(() => {
    dispatch({
      type: SORT_PRODUCTS,
    });
  }, [products, state.sort]);

  const setView = (type) => {
    dispatch({
      type: type === "grid" ? SET_GRIDVIEW : SET_LISTVIEW,
    });
  };

  const updateSort = (e) => {
    dispatch({
      type: UPDATE_SORT,
      payload: e.target.value,
    });
  };

  const updateFilters = (e) => {
    dispatch({
      type: UPDATE_FILTERS,
      payload: {
        name: e.target.name,
        value: e.target.value,
      },
    });
    dispatch({
      type: FILTER_PRODUCTS,
      payload: {
        name: e.target.name,
        value: e.target.value,
      },
    });
  };

  const clearFilters = () => {
    dispatch({
      type: CLEAR_FILTERS,
    });
  };
  return (
    <FilterContext.Provider
      value={{ ...state, setView, updateSort, updateFilters, clearFilters }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};

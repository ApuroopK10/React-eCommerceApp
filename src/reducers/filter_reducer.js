import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    // let maxPrice = Math.max(...action.payload.map((prod) => prod.price));
    let maxPrice = action.payload.sort((a, b) => b.price - a.price)[0]?.price;
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }

  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
    };
  }

  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      grid_view: false,
    };
  }

  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload,
    };
  }
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let sortProducts = [...filtered_products];
    switch (sort) {
      case "price-lowest":
        sortProducts = sortProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-highest":
        sortProducts = sortProducts.sort((a, b) => b.price - a.price);
        break;
      case "name-a":
        sortProducts = sortProducts.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
        break;
      default:
        sortProducts = sortProducts.sort((a, b) =>
          b.name.toLowerCase().localeCompare(a.name.toLowerCase())
        );
        break;
    }
    return { ...state, filtered_products: sortProducts };
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    const filter = {};
    filter[name] = value;
    return {
      ...state,
      filters: { ...state.filters, ...filter },
    };
  }
  if (action.type === FILTER_PRODUCTS) {
    // const { name, value } = action.payload;
    // let temp_products = [...state.all_products];
    // // if (name === "text") {
    // temp_products = temp_products.filter(
    //   (prod) => prod[name].toLowerCase().indexOf(value.toLowerCase()) > -1
    // );
    // }
    return {
      ...state,
      // filtered_products: temp_products,
    };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.max_price,
        shipping: false,
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;

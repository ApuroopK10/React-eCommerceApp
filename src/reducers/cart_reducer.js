import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, quantity, product } = action.payload;
    const { cart, count, total } = state;
    const itemExists = cart.find((item) => item.id === id + color);
    if (itemExists) {
      if (itemExists.quantity + quantity > itemExists.max) {
        itemExists.quantity = itemExists.max;
        return { ...state, cart };
      }
      itemExists.quantity += quantity;
      return { ...state, cart };
    } else {
      const tempItem = {
        id: id + color,
        color,
        name: product.name,
        quantity,
        max: product.stock,
        image: product.images[0].url,
        price: product.price,
      };
      return { ...state, cart: [...cart, tempItem] };
    }
  }

  if (action.type === REMOVE_CART_ITEM) {
    const cartArray = state.cart;
    const cartItemIndex = cartArray.findIndex(
      (item) => item.id === action.payload
    );
    cartArray.splice(cartItemIndex, 1);
    return { ...state, cart: [...cartArray] };
  }

  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;

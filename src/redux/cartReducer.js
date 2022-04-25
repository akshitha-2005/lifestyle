const initialState = {
  cartItems: [],
  formValues: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      console.log(action);
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    }
    case "DELETE_FROM_CART": {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (obj) => obj.id !== action.payload.id
        ),
      };
    }
    case "ADD_QUANTITY": {
      return {
        ...state,
        cartItems: state.cartItems.map((cart) =>
          cart.id === action.payload.id
            ? { ...cart, quantity: cart.quantity + 1 }
            : cart
        ),
      };
    }
    case "SUB_QUANTITY": {
      return {
        ...state,
        cartItems: state.cartItems.map((cart) =>
          cart.id === action.payload.id
            ? { ...cart, quantity: cart.quantity !== 1 ? cart.quantity - 1 : 1 }
            : cart
        ),
      };
    }
    case "CLEAR_CART": {
      return {
        ...state,
        cartItems: [],
      };
    }
    default:
      return state;
  }
};


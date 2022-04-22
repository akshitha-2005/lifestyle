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
        cartItems: state.cartItems.length > 0 ? state.cartItems.map(cart =>
          cart.id === action.payload.id
          ? {...cart, quantity: cart.quantity + 1 }
          : action.payload,
          ): [...state.cartItems, action.payload]
      };
      // return {
      //   // ...state,
      //   // cartItems: state.cartItems.map(product => 
      //   //   product.id === action.payload.id ? {...product, selected: true} : product,
      //   //   ),
      //   cartItems: [...state.cartItems, action.payload],
      // };
  }
    case "DELETE_FROM_CART": {
      return {
        ...state,
        cartItems: state.cartItems.filter(obj=>obj.id !== action.payload.id)
      };
    }
    case "ADD_QUANTITY": {
      return {
        ...state,
        cartItems: state.cartItems.map(cart =>
          cart.id === action.payload.id
          ? {...cart, quantity: cart.quantity + 1 }
          : cart,
          ),
      };
    }
    case "SUB_QUANTITY": {
      return {
        ...state,
        cartItems: state.cartItems.map(cart =>
          cart.id === action.payload.id
          ? {...cart, quantity: cart.quantity !==1 ? cart.quantity -1 : 1,
           }
          : cart,
          ),
      };
    }
    case "CLEAR_CART": {
      return {
        ...state, 
        cartItems: []
        
      };
    }
    default:
      return state;
  }
};



// const initialState = {
//   cartItems: [],
//   cart: [] //qty
  
// };

// const cartReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "ADD_TO_CART": 
//     const item = state.cartItems.find((prod) => prod.id === action.payload.id);

//     const inCart = state.cart.find((item) =>
//     item.id === action.payload.id ? true : false
//     );
//       return {
//         ...state,
//         cart: inCart
//         ? state.cart.map((item) =>
//         item.id === action.payload.id? { ...item, qty: item.qty +1 }
//         :item
//         )
//         : [...state.cart, { ...item, qty: 1}],
//       };
    
//     case "DELETE_FROM_CART": {
//       return {
//         ...state,
//         cart: state.cartItems.filter(item=>item.id !== action.payload.id)
//       }
//     }
//     case "ADJUST_QTY ": {
//      return{ ...state,
//       cart: state.cart.map((item) =>
//       item.id === action.payload.id
//       ? { ...item, qty: action.payload.qty}
//       : item
//       ),
//      }

//     }
//     default:
//       return state;
//   }
// };

// export default cartReducer;

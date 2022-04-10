import { cartConstants } from "../actions/constants";

const initialState = {
  cartItems: {
    /**Formate */
    //   123:{
    //       _id:123,
    //       name:'samsung moblie',
    //       img:'same.jpg',
    //       price:3000,
    //       quantity:1,
    //   }
  },
  updatingCart: false,
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartConstants.ADD_TO_CART_REQUEST:
      state = {
        ...state,
        updatingCart: true,
      };
      break;
    case cartConstants.ADD_TO_CART_SUCCESS:
      state = {
        ...state,
        cartItems: action.payload.cartItems,
        updatingCart: true,
      };
      break;
    case cartConstants.ADD_TO_CART_FAILURE:
      state = {
        ...state,
        updatingCart: true,
        error: action.payload.error,
      };
      break;
    case cartConstants.RESET_CART:
      state = {
        ...initialState ,
      };
      break;

    default:
      return state;
  }
  return state;
};

export default cartReducer;

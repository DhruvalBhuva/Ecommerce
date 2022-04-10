import { productConstants } from "../actions/constants";

const initialState = {
  products: [],
  productsByPrice: {
    under5k: [],
    under10k: [],
    under15k: [],
    above15k: [],
  },
  page: {},
  productDetails: {},
  error: null,
  loading: false,
  pageRequest: false,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case productConstants.GET_PRODUCT_BY_SLUG:
      state = {
        ...state,
        products: action.payload.products,
        productsByPrice: {
          ...action.payload.productsByPrice,
        },
      };
      break;

    case productConstants.GET_PRODUCT_PAGE_REQUEST:
      state = {
        ...state,
        pageRequest: true,
      };
      break;

    case productConstants.GET_PRODUCT_PAGE_SUCCESS:
      state = {
        ...state,
        pageRequest: false,
        page: action.payload.page,
      };
      break;

    case productConstants.GET_PRODUCT_PAGE_FAILURE:
      state = {
        ...state,
        pageRequest: false,
        error: action.payload.error,
      };
      break;

    case productConstants.GET_PRODUCT_DETAILSBY_ID_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;

    case productConstants.GET_PRODUCT_DETAILSBY_ID_SUCCESS:
      state = {
        ...state,
        loading: false,
        productDetails: action.payload.productDetails,
      };
      break;

    case productConstants.GET_PRODUCT_DETAILSBY_ID_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;

    default:
      return state;
  }
  return state;
};

export default productReducer;

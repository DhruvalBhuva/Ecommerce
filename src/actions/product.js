import * as API from "../APIs/APIs";
import { productConstants } from "./constants";

export const getProductBySlug = (slug) => {
  return async (dispatch) => {
    try {
      const res = await API.getProductBySlug(slug);

      if (res.status === 200) {
        dispatch({
          type: productConstants.GET_PRODUCT_BY_SLUG,
          payload: res.data,
        });
      } else {
        // dispatch({
        //     type:productConstants.GET_PRODUCT_BY_SLUG,
        //     payload: res.data
        // })
      }
    } catch (error) {
      console.log({ error });
    }
  };
};

export const getProductPage = (payload) => {
  return async (dispatch) => {
    const { cid, type } = payload.params;

    dispatch({ type: productConstants.GET_PRODUCT_PAGE_REQUEST });

    try {
      const res = await API.getProductPage(cid, type);
      console.log(res);
      if (res.status === 200) {
        const { page } = res.data;
        dispatch({
          type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
          payload: { page },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: productConstants.GET_PRODUCT_PAGE_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };
};

export const getProductDetailsById = (payload) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCT_DETAILSBY_ID_REQUEST });

    try {
      const { productId } = payload.params;

      const res = await API.getProductDetailsById(productId);
      console.log(res);
      
      if (res.status === 200) {
        const { page } = res.data;
        dispatch({
          type: productConstants.GET_PRODUCT_DETAILSBY_ID_SUCCESS,
          payload: { productDetails: res.data.product },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: productConstants.GET_PRODUCT_DETAILSBY_ID_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };
};

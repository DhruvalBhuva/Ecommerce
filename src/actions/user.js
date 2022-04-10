import * as API from "../APIs/APIs";
import { cartConstants, userConstants } from "./constants";

export const signup = (user) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });

    const res = await API.signUp(user);

    if (res.status === 201) {
      const { message } = res.data;

      dispatch({
        type: userConstants.USER_REGISTER_SUCCESS,
        payload: {
          message,
        },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstants.USER_REGISTER_FAILURE,
          payload: { error: res.data.error },
          // payload: { error: message },
        });
      }
    }
  };
};

export const getAddress = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_USER_ADDRESS_REQUEST });
      const res = await API.getAddress();

      console.log({ res });
      if (res.status === 200) {
        const {
          userAddress: { address },
        } = res.data;
        dispatch({
          type: userConstants.GET_USER_ADDRESS_SUCCESS,
          payload: { address },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.GET_USER_ADDRESS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addAddress = (payload) => {
  return async (dispatch) => {
    try {
      const res = await API.addAddress(payload);
      dispatch({ type: userConstants.ADD_USER_ADDRESS_REQUEST });
      if (res.status === 201) {
        console.log(res);
        const {
          address: { address },
        } = res.data;
        dispatch({
          type: userConstants.ADD_USER_ADDRESS_SUCCESS,
          payload: { address },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.ADD_USER_ADDRESS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addOrder = (payload) => {
  return async (dispatch) => {
    try {
      const res = await API.addorder(payload);
      dispatch({ type: userConstants.ADD_USER_ORDER_REQUEST });
      if (res.status === 201) {
        const { order } = res.data;
        dispatch({
          type: cartConstants.RESET_CART,
        });
        dispatch({
          type: userConstants.ADD_USER_ORDER_SUCCESS,
          payload: { order },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.ADD_USER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getOrders = () => {
  return async (dispatch) => {
    try {
      const res = await API.getorder();
      dispatch({ type: userConstants.GET_USER_ORDER_REQUEST });
      if (res.status === 200) {
        const { orders } = res.data;
        dispatch({
          type: userConstants.GET_USER_ORDER_SUCCESS,
          payload: { orders },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.GET_USER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// // single order with complete info and delivery location
// export const getOrder = (payload) => {
//   return async (dispatch) => {
//     try {
//       const res = await API..post(`/getOrder`, payload);
//       dispatch({ type: userConstants.GET_USER_ORDER_DETAILS_REQUEST });
//       if (res.status === 200) {
//         console.log(res);
//         const { order } = res.data;
//         dispatch({
//           type: userConstants.GET_USER_ORDER_DETAILS_SUCCESS,
//           payload: { order },
//         });
//       } else {
//         const { error } = res.data;
//         dispatch({
//           type: userConstants.GET_USER_ORDER_DETAILS_FAILURE,
//           payload: { error },
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

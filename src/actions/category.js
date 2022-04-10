import * as API from "../APIs/APIs";
import { categoryConstant } from "./constants";

export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstant.GET_ALL_CATEGORY_REQUEST });

    const res = await API.getAllCategory()
    const { categoryList } = res.data;

    if (res.status === 200) {
      dispatch({
        type: categoryConstant.GET_ALL_CATEGORY_SUUCESS,
        payload: { categories: categoryList },
      });
    } else {
      dispatch({
        type: categoryConstant.GET_ALL_CATEGORY_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

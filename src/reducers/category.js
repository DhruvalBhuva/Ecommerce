import { categoryConstant } from "../actions/constants";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const buildNewCategories = (parentId, categories, category) => {
  let myCatList = [];

  // If there are no parents
  if (parentId === undefined) {
    return [
      ...categories,
      {
        _id: category._id,
        name: category.name,
        slug: category.slug,
        parentId: category.parentId,
        children: [],
      },
    ];
  }

  //If there are parents and newly category is child
  for (let cat of categories) {
    if (cat._id === parentId) {
      myCatList.push({
        ...cat,
        children: cat.children
          ? buildNewCategories(
              parentId,
              [
                ...cat.children,
                {
                  _id: category._id,
                  name: category.name,
                  slug: category.slug,
                  parentId: category.parentId,
                  children: category.children,
                },
              ],
              category
            )
          : [],
      });
    } else {
      myCatList.push({
        ...cat,
        children: cat.children
          ? buildNewCategories(parentId, cat.children, category)
          : [],
      });
    }
  }
  return myCatList;
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case categoryConstant.GET_ALL_CATEGORY_SUUCESS:
      state = {
        ...state,
        categories: action.payload.categories,
      };
      break;
    case categoryConstant.ADD_NEW_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstant.ADD_NEW_CATEGORY_SUCCESS:
      const category = action.payload.category;
      const updatedCategories = buildNewCategories(
        category.parentId,
        state.categories,
        category
      );

      state = {
        ...state,

        // To update category without refresh
        categories: updatedCategories,
        loading: false,
      };
      break;
    case categoryConstant.ADD_NEW_CATEGORY_FAILURE:
      state = {
        ...initialState,
      };
      break;
    default:
      return state;
  }
  return state;
};

export default categoryReducer;

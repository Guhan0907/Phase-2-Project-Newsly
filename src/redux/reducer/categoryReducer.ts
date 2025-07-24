import { SET_CATEGORY_FROM_FOOTER } from "../action/categoryAction";

const initialState = {
  selectedCategory: "",
};

export const categoryReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CATEGORY_FROM_FOOTER:
      return { ...state, selectedCategory: action.payload };
    default:
      return state;
  }
};

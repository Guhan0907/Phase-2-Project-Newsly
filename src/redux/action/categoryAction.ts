// redux/action/uiAction.ts
export const SET_CATEGORY_FROM_FOOTER = "SET_CATEGORY_FROM_FOOTER";

export const setCategoryFromFooter = (category: string) => ({
  type: SET_CATEGORY_FROM_FOOTER,
  payload: category,
});
export type CategoryAction = ReturnType<typeof setCategoryFromFooter>;

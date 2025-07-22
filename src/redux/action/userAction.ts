export const SET_USER = "SET_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export interface User {
  name: string;
  email: string;
  password?: string;
  imageUrl: string;
}

export const setUser = (user: User) => ({
  type: SET_USER,
  payload: user,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

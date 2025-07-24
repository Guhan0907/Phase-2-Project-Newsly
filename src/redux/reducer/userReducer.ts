import { LOGOUT_USER, SET_USER, type User } from "../action/userAction";

export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case LOGOUT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default userReducer;

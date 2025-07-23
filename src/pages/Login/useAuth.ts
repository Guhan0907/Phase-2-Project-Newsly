import { useDispatch } from "react-redux";
import { setUser } from "../../redux/action/userAction";
// import { setUser } from "../actions/userActions";

const fallbackImage = "/assets/default-user.png";

export const useAuth = () => {
  const dispatch = useDispatch();

  const login = (userData: {
    name: string;
    email: string;
    picture?: string;
  }) => {
    dispatch(
      setUser({
        name: userData.name,
        email: userData.email,
        password: "", // Not applicable for Google login
        imageUrl: userData.picture || fallbackImage,
      }),
    );
  };

  return { login };
};

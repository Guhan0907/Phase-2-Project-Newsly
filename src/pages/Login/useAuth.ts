import { useDispatch } from "react-redux";
import { setUser } from "../../redux/action/userAction";

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
        password: "", // for Google no need
        imageUrl: userData.picture || fallbackImage,
      }),
    );
  };

  return { login };
};

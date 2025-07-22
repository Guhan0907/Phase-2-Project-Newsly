// components/ProtectedRoutes.tsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { ReactNode } from "react";
import type { RootState } from "../../redux/store";

interface ProtectedRoutesProps {
  children: ReactNode;
}

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const rawUser = useSelector((state: RootState) => state.user?.user);
  const parsedUser = typeof rawUser === "string" ? JSON.parse(rawUser).user : rawUser;

  // Check if user exists
  if (!parsedUser || !parsedUser.email) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;

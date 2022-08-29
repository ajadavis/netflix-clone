import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }: PropsWithChildren<{}>) {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/" />;
  } else {
    return <> {children}</>;
  }
}

export default ProtectedRoute;

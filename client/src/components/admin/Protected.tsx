import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export default function Protected() {
  const authContext = useContext(AuthContext);

  return (
    <>
      {!authContext?.isLoading && (
        <>{authContext?.user ? <Outlet /> : <Navigate to={"/"} />}</>
      )}
    </>
  );
}

import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const PrivateRoute = ({ component: Component, ...props }) => {
  const authContext = useContext(AuthContext);
  const { loading, authenticate, authUser } = authContext;
  useEffect(() => {
    authUser();
    //eslint-disable-next-line
  }, []);
  return (
    <Route
      {...props}
      render={(props) =>
        !authenticate && !loading ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;

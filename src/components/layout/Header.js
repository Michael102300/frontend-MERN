import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
const Header = () => {
  const authContext = useContext(AuthContext);
  const { user, authUser, logout } = authContext;

  useEffect(() => {
    authUser();
    //eslint-disable-next-line
  }, []);

  return (
    <header className="app-header">
      {user ? (
        <p className="nombre-usuario">
          Hi! <span>{user.name}</span>
        </p>
      ) : null}

      <nav className="nav-principal">
        <button className="btn btn-blank btn-primario" onClick={() => logout()}>
          LogOut
        </button>
      </nav>
    </header>
  );
};

export default Header;

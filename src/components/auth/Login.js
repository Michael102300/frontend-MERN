import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertContext from "../../context/alerts/alertContext";
import AuthContext from "../../context/auth/authContext";

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;
  const authContext = useContext(AuthContext);
  const { msg, authenticate, login } = authContext;

  useEffect(() => {
    if (authenticate) {
      props.history.push("/projects");
    }
    if (msg) {
      showAlert(msg.msg, msg.category);
    }
    //eslint-disable-next-line
  }, [msg, authenticate, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      showAlert("Todos los campos son obligatorios", "alerta-error");
    }
    login({ email, password });
  };
  return (
    <div className="form-usuario">
      {alert ? (
        <div className={`alerta ${alert.category}`}> {alert.msg} </div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Sign In</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Sign In"
            />
          </div>
        </form>
        <Link to={"/signup"} className="enlace-cuenta">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;

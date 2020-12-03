import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertContext from "../../context/alerts/alertContext";
import AuthContext from "../../context/auth/authContext";

const SignUp = (props) => {
  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;
  const authContext = useContext(AuthContext);
  const { msg, authenticate, signupUser } = authContext;

  //en caso de que el usuario se hubiese autenticado
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
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const { name, email, password, confirmpassword } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmpassword.trim() === ""
    ) {
      showAlert("Todos los campos son obligatorios 2", "alerta-error");
      return;
    }
    if (password.length < 6) {
      showAlert("Password minimo de 6 caracteres", "alerta-error");
      return;
    }
    if (password !== confirmpassword) {
      showAlert("Password no son iguales", "alerta-error");
      return;
    }
    signupUser({
      name,
      email,
      password,
    });
  };
  return (
    <div className="form-usuario">
      {alert ? (
        <div className={`alerta ${alert.category}`}> {alert.msg} </div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Sign Up</h1>
        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={name}
              onChange={onChange}
            />
          </div>
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
            <label htmlFor="confirmpassword">Confirm password</label>
            <input
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              placeholder="Confirm password"
              value={confirmpassword}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Sign Up"
            />
          </div>
        </form>
        <Link to={"/"} className="enlace-cuenta">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignUp;

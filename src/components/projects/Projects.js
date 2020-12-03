import React, { useContext, useEffect } from "react";

import SideBar from "../layout/SideBar";
import Header from "../layout/Header";
import FormTask from "../tasks/FormTask";
import ListTasks from "../tasks/ListTasks";
import AuthContext from "../../context/auth/authContext";

const Projects = () => {
  const authContext = useContext(AuthContext);
  const { authUser } = authContext;

  useEffect(() => {
    authUser();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="contenedor-app">
      <SideBar />
      <div className="seccion-principal">
        <Header />
        <main>
          <FormTask />
          <div className="contenedor-tareas">
            <ListTasks />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Projects;

import React, { useReducer } from "react";

import projectContext from "./projectContext";
import projectReducer from "./projectReducer";
import {
  FORM_PROJECT,
  GET_PROJECT,
  ADD_PROJECT,
  FORM_VALIDATE,
  CURRENT_PROJECT,
  DELETE_PROJECT,
  ERROR_PROJECT,
} from "../../types";

import clienteAxios from "../../config/axios";

const ProjectState = (props) => {
  const initialState = {
    projects: [],
    form: false,
    errorForm: false,
    currentProject: null,
    msg: null,
  };
  //dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(projectReducer, initialState);

  //Serie de funciones
  const showForm = () => {
    dispatch({
      type: FORM_PROJECT,
    });
  };
  // obtener proyectos
  const getProjects = async () => {
    try {
      const result = await clienteAxios.get("/api/projects");
      dispatch({
        type: GET_PROJECT,
        payload: result.data.projects,
      });
    } catch (error) {
      const alert = {
        msg: "Hubo un error",
        category: "alerta-error",
      };
      dispatch({
        type: ERROR_PROJECT,
        payload: alert,
      });
    }
  };
  //agregar proyecto
  const addProject = async (project) => {
    try {
      const result = await clienteAxios.post("/api/projects", project);
      dispatch({
        type: ADD_PROJECT,
        payload: result.data,
      });
    } catch (error) {
      const alert = {
        msg: "Hubo un error",
        category: "alerta-error",
      };
      dispatch({
        type: ERROR_PROJECT,
        payload: alert,
      });
    }
  };
  //mostrar error
  const showError = () => {
    dispatch({
      type: FORM_VALIDATE,
    });
  };
  //selecciona el proyecto que selecciona el usuario
  const selectProject = (projects) => {
    dispatch({
      type: CURRENT_PROJECT,
      payload: projects,
    });
  };

  const deleteProject = async (project) => {
    try {
      await clienteAxios.delete(`/api/projects/${project._id}`);
      dispatch({
        type: DELETE_PROJECT,
        payload: project,
      });
    } catch (error) {
      const alert = {
        msg: "Hubo un error",
        category: "alerta-error",
      };
      dispatch({
        type: ERROR_PROJECT,
        payload: alert,
      });
    }
  };
  return (
    <projectContext.Provider
      value={{
        currentProject: state.currentProject,
        projects: state.projects,
        form: state.form,
        errorForm: state.errorForm,
        msg: state.msg,
        showForm,
        getProjects,
        addProject,
        showError,
        selectProject,
        deleteProject,
      }}
    >
      {props.children}
    </projectContext.Provider>
  );
};

export default ProjectState;

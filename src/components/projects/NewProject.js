import React, { Fragment, useState, useContext } from "react";
import projectContext from "../../context/projects/projectContext";
const NewProject = () => {
  const projectsContext = useContext(projectContext);

  const { form, errorForm, showForm, addProject, showError } = projectsContext;
  //State para project
  const [project, setProject] = useState({
    name: "",
  });

  const onChangeProject = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitProject = (e) => {
    e.preventDefault();
    if (name === "") {
      showError();
      return;
    }
    addProject(project);
    setProject({
      name: "",
    });
  };
  const { name } = project;
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={() => showForm()}
      >
        New Project
      </button>
      {form ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProject}>
          <input
            type="text"
            className="input-text"
            placeholder="New Project"
            name="name"
            value={name}
            onChange={onChangeProject}
          />
          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Add Project"
          />
        </form>
      ) : null}
      {errorForm ? (
        <p className="mensaje error">Name project mandatory</p>
      ) : null}
    </Fragment>
  );
};
export default NewProject;

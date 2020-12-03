import React, { useContext } from "react";

import projectContext from "../../context/projects/projectContext";
import taskContext from "../../context/tasks/taskContext";

const Project = ({ project }) => {
  const projectsContext = useContext(projectContext);
  const { selectProject } = projectsContext;

  const tasksContext = useContext(taskContext);
  const { getTasks } = tasksContext;

  //funcion para agregar el proyecto actual
  const actualProject = (project) => {
    selectProject(project);
    getTasks(project);
  };
  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => actualProject(project)}
      >
        {project.name}
      </button>
    </li>
  );
};

export default Project;

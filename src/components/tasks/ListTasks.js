import React, { Fragment, useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import projectContext from "../../context/projects/projectContext";
import taskContext from "../../context/tasks/taskContext";
import Task from "./Task";
const ListTask = () => {
  const projectsContext = useContext(projectContext);
  const { currentProject, deleteProject } = projectsContext;

  const tasksContext = useContext(taskContext);
  const { tasksproject } = tasksContext;

  if (!currentProject) return <h2>Select one project</h2>;
  //array destructuring
  const [actualProject] = currentProject;

  const onClickDelete = () => {
    deleteProject(actualProject);
  };
  return (
    <Fragment>
      <h2>Project: {actualProject.name}</h2>
      <ul className="listado-tareas">
        {tasksproject.length === 0 ? (
          <li className="tarea"> Don´t have tasks</li>
        ) : (
          <TransitionGroup>
            {tasksproject.map((task) => (
              <CSSTransition key={task._id} timeout={200} classNames="tarea">
                <Task task={task} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        )}
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={onClickDelete}
      >
        Delete project &times;
      </button>
    </Fragment>
  );
};

export default ListTask;

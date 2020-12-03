import React, { useContext } from "react";
import projectContext from "../../context/projects/projectContext";
import taskContext from "../../context/tasks/taskContext";
const Task = ({ task }) => {
  const projectsContext = useContext(projectContext);
  const { currentProject } = projectsContext;
  const tasksContext = useContext(taskContext);
  const { deleteTask, getTasks, editTask, saveCurrentTask } = tasksContext;

  const [actualProject] = currentProject;

  const handleDelete = (id) => {
    deleteTask(id, actualProject._id);
    getTasks(actualProject);
  };

  const handleState = (task) => {
    if (task.state) {
      task.state = false;
    } else {
      task.state = true;
    }
    editTask(task);
  };

  const selectTask = (task) => {
    saveCurrentTask(task);
  };
  return (
    <li className="tarea sombra">
      <p>{task.name}</p>
      <div className="estado">
        {task.state ? (
          <button
            type="button"
            className="completo"
            onClick={() => handleState(task)}
          >
            Done
          </button>
        ) : (
          <button
            type="button"
            className="incompleto"
            onClick={() => handleState(task)}
          >
            Missing
          </button>
        )}
      </div>
      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => selectTask(task)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => handleDelete(task._id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Task;

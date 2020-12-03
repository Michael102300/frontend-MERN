import React, { useContext, useState, useEffect } from "react";
import projectContext from "../../context/projects/projectContext";
import taskContext from "../../context/tasks/taskContext";

const FormTask = () => {
  const projectsContext = useContext(projectContext);
  const { currentProject } = projectsContext;

  const tasksContext = useContext(taskContext);
  const {
    errortask,
    selecttask,
    addTask,
    valideTask,
    getTasks,
    editTask,
    cleanTask,
  } = tasksContext;

  const [task, setTask] = useState({
    name: "",
  });
  useEffect(() => {
    if (selecttask !== null) {
      setTask(selecttask);
    } else {
      setTask({
        name: "",
      });
    }
  }, [selecttask]);
  if (!currentProject) return null;

  const { name } = task;

  //array destructuring
  const [actualProject] = currentProject;

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      valideTask();
      return;
    }
    if (selecttask === null) {
      task.project = actualProject._id;
      addTask(task);
    } else {
      editTask(task);
      cleanTask();
    }
    getTasks(actualProject);
    setTask({
      name: "",
    });
  };
  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Name task..."
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={selecttask ? "Edit task" : "Add task"}
          />
        </div>
      </form>
      {errortask ? (
        <p className="mensaje error">Name task is necessary</p>
      ) : null}
    </div>
  );
};

export default FormTask;

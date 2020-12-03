import React, { useReducer } from "react";
import TaskContext from "./taskContext";
import TaskReducer from "./taskReducer";

import {
  TASKS_PROJECT,
  ADD_TASK,
  TASK_VALIDATE,
  DELETE_TASK,
  CURRENT_TASK,
  EDIT_TASK,
  CLEAN_TASK,
} from "../../types";

import clienteAxios from "../../config/axios";
const TaskState = (props) => {
  const initialState = {
    tasksproject: [],
    errortask: false,
    selecttask: null,
  };

  //crear dispatch y state
  const [state, dispatch] = useReducer(TaskReducer, initialState);

  //crear funciones
  const getTasks = async (project) => {
    try {
      const actualProject = project._id;
      const result = await clienteAxios.get("/api/tasks", {
        params: { project: actualProject },
      });
      console.log(result);
      dispatch({
        type: TASKS_PROJECT,
        payload: result.data.tasks,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //add task
  const addTask = async (task) => {
    try {
      console.log(task);
      const result = await clienteAxios.post("/api/tasks", task);
      console.log(result);
      dispatch({
        type: ADD_TASK,
        payload: task,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //VALIDAR y mostrar un error
  const valideTask = () => {
    dispatch({
      type: TASK_VALIDATE,
    });
  };

  const deleteTask = async (taskId, project) => {
    try {
      await clienteAxios.delete(`/api/tasks/${taskId}`, {
        params: { project },
      });
      dispatch({
        type: DELETE_TASK,
        payload: taskId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = async (task) => {
    try {
      const result = await clienteAxios.put(`/api/tasks/${task._id}`, task);
      console.log(result.data.task);
      dispatch({
        type: EDIT_TASK,
        payload: result.data.task,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const saveCurrentTask = (task) => {
    dispatch({
      type: CURRENT_TASK,
      payload: task,
    });
  };

  const cleanTask = () => {
    dispatch({
      type: CLEAN_TASK,
    });
  };
  return (
    <TaskContext.Provider
      value={{
        errortask: state.errortask,
        selecttask: state.selecttask,
        tasksproject: state.tasksproject,
        getTasks,
        addTask,
        valideTask,
        deleteTask,
        saveCurrentTask,
        editTask,
        cleanTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;

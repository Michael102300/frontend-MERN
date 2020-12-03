import {
  TASKS_PROJECT,
  ADD_TASK,
  TASK_VALIDATE,
  DELETE_TASK,
  CURRENT_TASK,
  EDIT_TASK,
  CLEAN_TASK,
} from "../../types";
//eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case TASKS_PROJECT:
      return {
        ...state,
        tasksproject: action.payload,
      };
    case ADD_TASK:
      return {
        ...state,
        tasksproject: [action.payload, ...state.tasksproject],
        errortask: false,
      };
    case TASK_VALIDATE:
      return {
        ...state,
        errortask: true,
      };
    case DELETE_TASK:
      return {
        ...state,
        tasksproject: state.tasksproject.filter(
          (task) => task._id !== action.payload
        ),
      };
    case EDIT_TASK:
      return {
        ...state,
        tasksproject: state.tasksproject.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };
    case CURRENT_TASK:
      return {
        ...state,
        selecttask: action.payload,
      };
    case CLEAN_TASK:
      return {
        ...state,
        selecttask: null,
      };
    default:
      return state;
  }
};

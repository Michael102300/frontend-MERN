import {
  FORM_PROJECT,
  GET_PROJECT,
  ADD_PROJECT,
  FORM_VALIDATE,
  CURRENT_PROJECT,
  DELETE_PROJECT,
  ERROR_PROJECT,
} from "../../types";
//eslint-disable-next-line
export default (state, action) => {
  switch (action.type) {
    case FORM_PROJECT: {
      return {
        ...state,
        form: true,
      };
    }
    case GET_PROJECT: {
      return {
        ...state,
        projects: action.payload,
      };
    }
    case ADD_PROJECT: {
      return {
        ...state,
        projects: [...state.projects, action.payload],
        form: false,
        errorForm: false,
      };
    }
    case FORM_VALIDATE: {
      return {
        ...state,
        errorForm: true,
      };
    }
    case CURRENT_PROJECT: {
      return {
        ...state,
        currentProject: state.projects.filter(
          (project) => project._id === action.payload._id
        ),
      };
    }
    case DELETE_PROJECT: {
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id !== action.payload._id
        ),
        currentProject: null,
      };
    }
    case ERROR_PROJECT: {
      return {
        ...state,
        msg: action.payload,
      };
    }
    default:
      return state;
  }
};

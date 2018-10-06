import {
  LOAD_DB,
  LOAD_DB_ERROR,
  LOAD_DB_SUCCESS,
  LOAD_DB_BEGIN,
  CLOSE_PROJECT_SUCCESS,
  ADD_STAFFING_SUCCESS,
  ADD_PROJECT_SUCCESS,
  UPDATE_PROJECT_SUCCESS,
  ADD_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_CUSTOM_DAY_SUCCESS,
  ADD_USER_CUSTOM_DAY_SUCCESS
} from './types';

const initialState = {
  isLoading: true,
  errorMessage: '',
  data: {}
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_DB:
    case LOAD_DB_BEGIN:
      return Object.assign({}, state, {
        isLoading: true,
        errorMessage: '',
        data: {}
      });

    case LOAD_DB_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        errorMessage: '',
        data: action.payload.data
      });

    case LOAD_DB_ERROR:
      const error = action.payload.error;
      let errorMessage = '';

      if (error.response) {
        errorMessage = `Staffing DB Fetch: ${error.response.status} ${error.response.statusText}`;
      } else {
        errorMessage = error.toString();
      }

      return Object.assign({}, state, {
        isLoading: true,
        errorMessage: errorMessage,
        data: {}
      });

    case CLOSE_PROJECT_SUCCESS:
    case ADD_STAFFING_SUCCESS:
      const newState = Object.assign({}, state);
      newState.data.projects = newState.data.projects.map(project =>
        (project.id === action.payload.project.id) ? action.payload.project : project
      );
      return newState;

    case ADD_PROJECT_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          projects: [
            ...state.data.projects,
            action.payload.project
          ]
        }
      };

    case UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          projects: state.data.projects.map(project => (project.id === action.payload.project.id) ? action.payload.project : project)
        }
      };

    case ADD_USER_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          users: [
            ...state.data.users,
            action.payload.user
          ]
        }
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          users: state.data.users.map(user => (user.id === action.payload.user.id) ? action.payload.user : user)
        }
      };

    case ADD_USER_CUSTOM_DAY_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          userCustomDays: [
            ...state.data.userCustomDays,
            action.payload.userCustomDay
          ]
        }
      };

    case UPDATE_USER_CUSTOM_DAY_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          userCustomDays: state.data.userCustomDays.map(day => (day.id === action.payload.userCustomDay.id) ? action.payload.userCustomDay : day)
        }
      };

    default:
      return state;
  }
};

export default rootReducer;

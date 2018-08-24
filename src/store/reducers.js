import {
  LOAD_DB, LOAD_DB_ERROR, LOAD_DB_SUCCESS, LOAD_DB_BEGIN,
  CLOSE_PROJECT_SUCCESS,
  ADD_STAFFING_SUCCESS,
  ADD_PROJECT_SUCCESS
} from './types';

const initialState = {
  isLoading: true,
  errorMessage: '',
  data: {}
}

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
        errorMessage = `Something went horribly wrong :(`;
      }

      return Object.assign({}, state, {
        isLoading: false,
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

      console.log('reduce to', {
        ...state,
        data: {
          ...state.data,
          projects: [
            ...state.data.projects,
            action.payload.project
          ]
        }
      });

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

    default:
      return state;
  }
};

export default rootReducer;

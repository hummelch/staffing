import { loadDbBegin, loadDbSuccess, loadDbError, closeProjectSuccess, addStaffingSuccess } from './actions';
import axios from 'axios';
import store from './index';

export function loadDb() {
  return dispatch => {
    dispatch(loadDbBegin());

    return axios.get('http://localhost:5000/db')
      .then((response) => {
        dispatch(loadDbSuccess(response.data));
      })
      .catch((error) => {
        dispatch(loadDbError(error))
      });
  };
}

export function closeProject(projectId) {
  return dispatch => {
    // dispatch(loadDbBegin());

    const state = store.getState();
    const { projects } = state.data;
    const project = Object.assign({}, projects.find((item) => item.id === projectId));
    project.closed = true;

    return axios({
      method: 'PUT',
      url: `http://localhost:5000/projects/${project.id}`,
      headers: { 'Content-Type': 'application/json' },
      data: project
    })
      .then((response) => {
        dispatch(closeProjectSuccess(response.data));
      })
      .catch((error) => {
        console.log('error close project', error);
        // dispatch(loadDbError(error))
      });
  };
}

export function addStaffings(projectId, staffings) {
  return dispatch => {
    // dispatch(loadDbBegin());

    const state = store.getState();
    const { projects } = state.data;
    const project = Object.assign({}, projects.find((item) => item.id === projectId));
    project.staffings.push(...staffings);

    return axios({
      method: 'PUT',
      url: `http://localhost:5000/projects/${project.id}`,
      headers: { 'Content-Type': 'application/json' },
      data: project
    })
      .then((response) => {
        dispatch(addStaffingSuccess(response.data));
      })
      .catch((error) => {
        console.log('error close project', error);
        // dispatch(loadDbError(error))
      });
  };
}
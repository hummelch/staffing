import { loadDbBegin, loadDbSuccess, loadDbError, closeProjectSuccess, addStaffingSuccess, addProjectSuccess, updateProjectSuccess } from './actions';
import axios from 'axios';
import store from './index';
import {config} from '../config';

export function loadDb() {
  return dispatch => {
    dispatch(loadDbBegin());

    return axios.all([
      axios.get(`${config.databaseHost}/users`),
      axios.get(`${config.databaseHost}/projects?year=${config.year}&closed=false`),
      axios.get(`${config.databaseHost}/userCustomDays?year=${config.year}`)
    ]).then(axios.spread((users, projects, userCustomDays) => {
      dispatch(loadDbSuccess({
        users: users.data,
        projects: projects.data,
        userCustomDays: userCustomDays.data
      }));
    })).catch((error) => {
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
      url: `${config.databaseHost}/projects/${project.id}`,
      headers: { 'Content-Type': 'application/json' },
      data: project
    })
      .then((response) => {
        dispatch(closeProjectSuccess(response.data));
      })
      .catch((error) => {
        console.error('error close project', error);
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
      url: `${config.databaseHost}/projects/${project.id}`,
      headers: { 'Content-Type': 'application/json' },
      data: project
    })
      .then((response) => {
        dispatch(addStaffingSuccess(response.data));
      })
      .catch((error) => {
        console.error('error close project', error);
        // dispatch(loadDbError(error))
      });
  };
}

export function removeStaffing(projectId, userId, week, days) {
  return dispatch => {
    // dispatch(loadDbBegin());

    const state = store.getState();
    const { projects } = state.data;
    const project = Object.assign({}, projects.find((item) => item.id === projectId));
    project.staffings.splice(project.staffings.findIndex(elem => (elem.user_id === userId && elem.week === week && elem.days === days)), 1);

    return axios({
      method: 'PUT',
      url: `${config.databaseHost}/projects/${projectId}`,
      headers: { 'Content-Type': 'application/json' },
      data: project
    })
      .then((response) => {
        dispatch(updateProjectSuccess(response.data));
      })
      .catch((error) => {
        console.error('error remove staffing', error);
        // dispatch(loadDbError(error))
      });
  };
}


export function addProject(project) {
  return dispatch => {
    // dispatch(loadDbBegin());

    return axios({
      method: 'POST',
      url: `${config.databaseHost}/projects`,
      headers: { 'Content-Type': 'application/json' },
      data: project
    })
      .then((response) => {
        dispatch(addProjectSuccess(response.data));
      })
      .catch((error) => {
        console.error('error adding project', error);
        // dispatch(loadDbError(error))
      });
  };
}

export function updateProject(project) {
  return dispatch => {
    // dispatch(loadDbBegin());

    return axios({
      method: 'PUT',
      url: `${config.databaseHost}/projects/${project.id}`,
      headers: { 'Content-Type': 'application/json' },
      data: project
    })
      .then((response) => {
        dispatch(updateProjectSuccess(response.data));
      })
      .catch((error) => {
        console.error('error adding project', error);
        // dispatch(loadDbError(error))
      });
  };
}

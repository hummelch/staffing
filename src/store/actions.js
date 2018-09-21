import {
  LOAD_DB_BEGIN, LOAD_DB_ERROR, LOAD_DB_SUCCESS,
  CLOSE_PROJECT_SUCCESS, ADD_STAFFING_SUCCESS,
  ADD_PROJECT_SUCCESS,
  UPDATE_PROJECT_SUCCESS, UPDATE_USER_SUCCESS, ADD_USER_SUCCESS
} from './types';

export const loadDbBegin = () => ({
  type: LOAD_DB_BEGIN
});

export const loadDbSuccess = data => ({
  type: LOAD_DB_SUCCESS,
  payload: { data }
});

export const loadDbError = error => ({
  type: LOAD_DB_ERROR,
  payload: { error }
});

export const addStaffingSuccess = project => ({
  type: ADD_STAFFING_SUCCESS,
  payload: { project }
});

export const closeProjectSuccess = project => ({
  type: CLOSE_PROJECT_SUCCESS,
  payload: { project }
});

export const addProjectSuccess = project => ({
  type: ADD_PROJECT_SUCCESS,
  payload: { project }
});

export const updateProjectSuccess = project => ({
  type: UPDATE_PROJECT_SUCCESS,
  payload: { project }
});

export const addUserSuccess = user => ({
  type: ADD_USER_SUCCESS,
  payload: { user }
});

export const updateUserSuccess = user => ({
  type: UPDATE_USER_SUCCESS,
  payload: { user }
});


import {
  LOAD_DB_BEGIN, LOAD_DB_ERROR, LOAD_DB_SUCCESS,
  CLOSE_PROJECT_BEGIN, CLOSE_PROJECT_ERROR, CLOSE_PROJECT_SUCCESS, ADD_STAFFING_SUCCESS
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

export const closeProjectBegin = () => ({
  type: CLOSE_PROJECT_BEGIN
});

export const closeProjectSuccess = project => ({
  type: CLOSE_PROJECT_SUCCESS,
  payload: { project }
});

export const closeProjectError = error => ({
  type: CLOSE_PROJECT_ERROR,
  payload: { error }
});

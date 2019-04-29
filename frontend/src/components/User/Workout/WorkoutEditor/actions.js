export const SET_INITIAL_DATA = 'SET_INITIAL_DATA';
export const ADD_EXERCISE = 'ADD_EXERCISE';
export const DELETE_EXERCISE = 'DELETE_EXERCISE';
export const ADD_DATE = 'ADD_DATE';
export const UPDATE_DATE_COMPLETED = 'UPDATE_DATE';
export const DELETE_DATE = 'DELETE_DATE';


export const setInitialData = payload => (
  { type: SET_INITIAL_DATA, payload }
);

export const updateDateCompleted = payload => (
  { type: UPDATE_DATE_COMPLETED, payload }
);

export const deleteDate = payload => (
  { type: DELETE_DATE, payload }
);

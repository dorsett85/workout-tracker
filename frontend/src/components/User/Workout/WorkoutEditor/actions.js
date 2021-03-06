export const SET_INITIAL_DATA = 'SET_INITIAL_DATA';

export const ADD_EXERCISE = 'ADD_EXERCISE';
export const UPDATE_EXERCISE_NAME = 'UPDATE_EXERCISE_NAME';
export const UPDATE_EXERCISE_NOTES = 'UPDATE_EXERCISE_NOTES';
export const DELETE_EXERCISE = 'DELETE_EXERCISE';

export const ADD_DATE = 'ADD_DATE';
export const UPDATE_DATE_COMPLETED = 'UPDATE_DATE';
export const DELETE_DATE = 'DELETE_DATE';

export const UPDATE_RESULT_VALUE = 'UPDATE_RESULT_VALUE';


export const setInitialData = payload => (
  { type: SET_INITIAL_DATA, payload }
);

export const updateDateCompleted = payload => (
  { type: UPDATE_DATE_COMPLETED, payload }
);

export const addExercise = payload => (
  { type: ADD_EXERCISE, payload }
);

export const updateExerciseName = payload => (
  { type: UPDATE_EXERCISE_NAME, payload }
);

export const updateExerciseNotes = payload => (
  { type: UPDATE_EXERCISE_NOTES, payload }
);

export const deleteExercise = payload => (
  { type: DELETE_EXERCISE, payload }
);

export const addDate = payload => (
  { type: ADD_DATE, payload }
);

export const deleteDate = payload => (
  { type: DELETE_DATE, payload }
);

export const updateResultValue = payload => (
  { type: UPDATE_RESULT_VALUE, payload }
);

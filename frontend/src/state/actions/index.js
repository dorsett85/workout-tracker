export const APP_LOADED = 'APP_LOADED';
export const CHANGE_USER = 'CHANGE_USER';

export const SET_CREATING_WORKOUT = 'SET_CREATING_WORKOUT';
export const SET_EDITING_WORKOUT_ID = 'SET_EDITING_WORKOUT_ID';
export const SET_FETCHING_WORKOUTS = 'SET_FETCHING_WORKOUTS';
export const SET_LAST_COMPLETED_WORKOUT_DATE = 'SET_LAST_COMPLETED_WORKOUT_DATE';
export const ADD_WORKOUTS = 'ADD_WORKOUTS';
export const UPDATE_WORKOUT_NAME = 'UPDATE_WORKOUT_NAME';
export const UPDATE_WORKOUT_NOTES = 'UPDATE_WORKOUT_NOTES';
export const DELETE_WORKOUT = 'DELETE_WORKOUT';


// App actions
export const setAppLoaded = payload => (
  { type: APP_LOADED, payload }
);

// User actions
export const changeUser = payload => (
  { type: CHANGE_USER, payload }
);

// Workout actions
export const setCreatingWorkout = payload => (
  { type: SET_CREATING_WORKOUT, payload }
);

export const setEditingWorkoutId = payload => (
  { type: SET_EDITING_WORKOUT_ID, payload }
);

export const setFetchingWorkouts = payload => (
  { type: SET_FETCHING_WORKOUTS, payload }
);

export const setLastCompletedWorkoutDate = payload => (
  { type: SET_LAST_COMPLETED_WORKOUT_DATE, payload }
);

export const addWorkouts = payload => (
  { type: ADD_WORKOUTS, payload }
);

export const updateWorkoutName = payload => (
  { type: UPDATE_WORKOUT_NAME, payload }
);

export const updateWorkoutNotes = payload => (
  { type: UPDATE_WORKOUT_NOTES, payload }
);

export const deleteWorkout = payload => (
  { type: DELETE_WORKOUT, payload }
);

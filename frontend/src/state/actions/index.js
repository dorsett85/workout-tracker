export const APP_LOADED = 'APP_LOADED';
export const CHANGE_USER = 'CHANGE_USER';
export const LOADING_USER = 'LOADING_USER';
export const ADD_WORKOUTS = 'ADD_WORKOUTS';
export const REMOVE_WORKOUTS = 'REMOVE_WORKOUTS';
export const RESET_WORKOUTS = 'RESET_WORKOUTS';


const setAppLoaded = payload => (
  { type: APP_LOADED, payload }
);

const changeUser = payload => (
  { type: CHANGE_USER, payload }
);

const loadingUser = payload => (
  { type: LOADING_USER, payload }
);

const addWorkouts = payload => (
  { type: ADD_WORKOUTS, payload }
);
const removeWorkouts = payload => (
  { type: REMOVE_WORKOUTS, payload }
);

const resetWorkouts = payload => (
  { type: RESET_WORKOUTS, payload }
);

export {
  setAppLoaded,
  changeUser,
  loadingUser,
  addWorkouts,
  removeWorkouts,
  resetWorkouts
};

export const APP_LOADED = 'APP_LOADED';
export const CHANGE_USER = 'CHANGE_USER';
export const LOADING_USER = 'LOADING_USER';
export const ADD_WORKOUT = 'ADD_WORKOUT';


const appIsLoaded = payload => (
  { type: APP_LOADED, payload }
);

const changeUser = payload => (
  { type: CHANGE_USER, payload }
);

const loadingUser = payload => (
  { type: LOADING_USER, payload }
);

const addWorkout = payload => (
  { type: ADD_WORKOUT, payload }
);

export {
  appIsLoaded,
  changeUser,
  loadingUser,
  addWorkout
};

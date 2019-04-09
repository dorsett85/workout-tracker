import { LOGIN_USER, ADD_WORKOUT } from './action-types';


const loginUser = payload => (
  { type: LOGIN_USER, payload }
);

const addWorkout = payload => (
  { type: ADD_WORKOUT, payload }
);

export {
  loginUser,
  addWorkout
};

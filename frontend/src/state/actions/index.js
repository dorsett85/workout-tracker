import { LOGIN_USER, REGISTER_USER, ADD_WORKOUT } from './action-types';


const loginUser = payload => (
  { type: LOGIN_USER, payload }
);

const registerUser = payload => (
  { type: REGISTER_USER, payload }
);

const addWorkout = payload => (
  { type: ADD_WORKOUT, payload }
);

export {
  loginUser,
  registerUser,
  addWorkout
};

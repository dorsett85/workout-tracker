import { CHANGE_USER, ADD_WORKOUT } from './action-types';


const changeUser = payload => (
  { type: CHANGE_USER, payload }
);

const addWorkout = payload => (
  { type: ADD_WORKOUT, payload }
);

export {
  changeUser,
  addWorkout
};

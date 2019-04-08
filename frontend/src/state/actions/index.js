import { ADD_WORKOUT } from '../constants/action-types';

const addWorkout = payload => (
  { type: ADD_WORKOUT, payload }
);
export { addWorkout };

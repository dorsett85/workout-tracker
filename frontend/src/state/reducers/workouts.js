import { ADD_WORKOUTS, REMOVE_WORKOUTS, RESET_WORKOUTS } from '../actions';


const workouts = (state = [], { type, payload }) => {
  if (type === ADD_WORKOUTS) {
    const workoutsToAdd = Array.isArray(payload) ? payload : [payload];
    return [...workoutsToAdd, ...state];
  }
  if (type === REMOVE_WORKOUTS) {
    const newState = state.filter(({ id }) => id !== payload);
    return newState;
  }
  if (type === RESET_WORKOUTS) {
    return [];
  }
  return state;
};

export default workouts;

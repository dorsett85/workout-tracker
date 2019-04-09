import { ADD_WORKOUT } from '../actions/action-types';


const workouts = (state = [], { type, payload }) => {
  if (type === ADD_WORKOUT) {
    return [...state, payload];
  }
  return state;
};

export default workouts;

import { ADD_WORKOUT } from '../constants/action-types';


const initialState = {
  workouts: []
};

const rootReducer = (state = initialState, { type, payload }) => {
  if (type === ADD_WORKOUT) {
    return Object.assign({}, state, {
      workouts: state.workouts.concat(payload)
    });
  }
  return state;
};

export default rootReducer;

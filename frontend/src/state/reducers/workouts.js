import { SET_CREATING_WORKOUT, ADD_WORKOUTS, EDIT_WORKOUT, REMOVE_WORKOUTS } from '../actions';


const initialState = {
  workouts: [],
  creatingWorkout: false,
  editingWorkoutId: undefined
};

const workouts = (state = initialState, { type, payload }) => {
  if (type === SET_CREATING_WORKOUT) {
    return { ...state, creatingWorkout: payload };
  }
  if (type === ADD_WORKOUTS) {
    const workoutsToAdd = Array.isArray(payload) ? payload : [payload];
    return { ...state, workouts: [...workoutsToAdd, ...state.workouts] };
  }
  if (type === EDIT_WORKOUT) {
    return { ...state, editingWorkoutId: payload };
  }
  if (type === REMOVE_WORKOUTS) {
    const newWorkouts = payload
      ? state.workouts.filter(({ id }) => id !== payload)
      : [];
    return { ...state, workouts: newWorkouts };
  }
  return state;
};

export default workouts;

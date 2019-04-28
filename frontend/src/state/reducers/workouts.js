import {
  SET_CREATING_WORKOUT,
  SET_CURRENT_WORKOUT,
  SET_FETCHING_WORKOUTS,
  ADD_WORKOUTS,
  REMOVE_WORKOUTS
} from '../actions';


const initialState = {
  workouts: [],
  currentWorkout: {},
  creatingWorkout: false,
  fetchingWorkouts: true,
  editingWorkout: false
};

const workouts = (state = initialState, { type, payload }) => {
  if (type === SET_CREATING_WORKOUT) {
    return { ...state, creatingWorkout: payload };
  }
  if (type === SET_CURRENT_WORKOUT) {
    const currentWorkout = state.workouts.find(workoutInfo => workoutInfo.id === payload) || {};
    return { ...state, currentWorkout };
  }
  if (type === SET_FETCHING_WORKOUTS) {
    return { ...state, fetchingWorkouts: payload };
  }
  if (type === ADD_WORKOUTS) {
    const workoutsToAdd = Array.isArray(payload) ? payload : [payload];
    return { ...state, workouts: [...workoutsToAdd, ...state.workouts] };
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

import {
  SET_CREATING_WORKOUT,
  SET_EDITING_WORKOUT_ID,
  SET_FETCHING_WORKOUTS,
  SET_LAST_COMPLETED_WORKOUT_DATE,
  ADD_WORKOUTS,
  UPDATE_WORKOUT_NAME,
  UPDATE_WORKOUT_NOTES,
  DELETE_WORKOUT
} from '../actions';


const initialState = {
  workouts: [],
  creatingWorkout: false,
  fetchingWorkouts: true,
  editingWorkoutId: undefined
};

const workouts = (state = initialState, { type, payload }) => {
  if (type === SET_CREATING_WORKOUT) {
    return { ...state, creatingWorkout: payload };
  }

  if (type === SET_EDITING_WORKOUT_ID) {
    return { ...state, editingWorkoutId: payload };
  }

  if (type === SET_FETCHING_WORKOUTS) {
    return { ...state, fetchingWorkouts: payload };
  }

  if (type === SET_LAST_COMPLETED_WORKOUT_DATE) {
    const { workoutId, lastCompleted } = payload;
    const updatedWorkouts = state.workouts.map((workout) => {
      const newWorkout = workout;
      if (workout.id === workoutId) {
        newWorkout.lastCompleted = lastCompleted && new Date(lastCompleted);
      }
      return newWorkout;
    });
    return { ...state, workouts: updatedWorkouts };
  }

  if (type === ADD_WORKOUTS) {
    const workoutsWithDate = payload.map(({ created, lastcompleted, ...workout }) => (
      {
        ...workout,
        created: new Date(created),
        lastCompleted: lastcompleted && new Date(lastcompleted)
      }
    ));
    return { ...state, workouts: [...workoutsWithDate, ...state.workouts] };
  }

  if (type === UPDATE_WORKOUT_NAME) {
    const { id, workoutName } = payload;
    const updatedWorkouts = state.workouts.map((workout) => {
      if (workout.id === id) {
        const newWorkout = workout;
        newWorkout.name = workoutName;
      }
      return workout;
    });
    return { ...state, workouts: updatedWorkouts };
  }

  if (type === UPDATE_WORKOUT_NOTES) {
    const { id, workoutNotes } = payload;
    const updatedWorkouts = state.workouts.map((workout) => {
      if (workout.id === id) {
        const newWorkout = workout;
        newWorkout.notes = workoutNotes;
      }
      return workout;
    });
    return { ...state, workouts: updatedWorkouts };
  }

  if (type === DELETE_WORKOUT) {
    const newWorkouts = payload
      ? state.workouts.filter(({ id }) => id !== payload)
      : [];
    return { ...state, workouts: newWorkouts };
  }
  return state;
};

export default workouts;

import {
  SET_INITIAL_DATA,
  ADD_EXERCISE, UPDATE_EXERCISE_NAME, UPDATE_EXERCISE_NOTES, DELETE_EXERCISE,
  ADD_DATE, UPDATE_DATE_COMPLETED, DELETE_DATE,
  UPDATE_RESULT_VALUE
} from './actions';


export default function workoutEditorReducer(state, { type, payload }) {
  if (type === SET_INITIAL_DATA) {
    return payload;
  }

  if (type === ADD_EXERCISE) {
    return payload;
  }

  if (type === UPDATE_EXERCISE_NAME) {
    const { exId, exName } = payload;
    return state.map((row) => {
      const exercise = row[`exercise${exId}`];
      exercise.name = exName;
      return row;
    });
  }

  if (type === UPDATE_EXERCISE_NOTES) {
    const { exId, exNotes } = payload;
    return state.map((row) => {
      const exercise = row[`exercise${exId}`];
      exercise.notes = exNotes;
      return row;
    });
  }

  if (type === DELETE_EXERCISE) {
    return payload;
  }

  if (type === ADD_DATE) {
    return [...state, ...payload];
  }

  if (type === UPDATE_DATE_COMPLETED) {
    const { wdId, completed } = payload;
    return state.map((row) => {
      const { date } = row;
      if (date.wdId === wdId) { date.completed = completed; }
      return row;
    });
  }

  if (type === UPDATE_RESULT_VALUE) {
    const { wrId, exId, wrValue } = payload;
    return state.map((row) => {
      const exercise = row[`exercise${exId}`];
      if (exercise.wrId === wrId) { exercise.value = wrValue; }
      return row;
    });
  }

  if (type === DELETE_DATE) {
    return state.filter(row => row.date.wdId !== payload);
  }

  return state;
}

import {
  SET_INITIAL_DATA,
  ADD_EXERCISE, DELETE_EXERCISE,
  ADD_DATE, UPDATE_DATE_COMPLETED, DELETE_DATE
} from './actions';


export default function workoutEditorReducer(state, { type, payload }) {
  if (type === SET_INITIAL_DATA) {
    return payload;
  }
  if (type === ADD_EXERCISE) {
    return state;
  }
  if (type === DELETE_EXERCISE) {
    return state;
  }
  if (type === ADD_DATE) {
    return state;
  }
  if (type === UPDATE_DATE_COMPLETED) {
    const { wdId, completed } = payload;
    const newState = state.map((row) => {
      const { date } = row;
      if (date.wdId === wdId) { date.completed = completed; }
      return row;
    });
    return newState;
  }
  if (type === DELETE_DATE) {
    return state.filter(row => row.date.wdId !== payload);
  }
  return state;
}

import {
  SET_INITIAL_DATA,
  ADD_EXERCISE,
  DELETE_EXERCISE,
  ADD_DATE,
  DELETE_DATE
} from './actions';


export default function workoutEditorReducer(state, { type, payload }) {
  switch (type) {
    case SET_INITIAL_DATA:
      return payload;
    case ADD_EXERCISE:
      return { ...state, count: state.count - 1 };
    case DELETE_EXERCISE:
      return { ...state, count: state.count - 1 };
    case ADD_DATE:
      return { ...state, count: state.count - 1 };
    case DELETE_DATE:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

import { combineReducers } from 'redux';
import user from './user';
import workouts from './workouts';


export default combineReducers({
  user,
  workouts
});

import { combineReducers } from 'redux';
import app from './app';
import user from './user';
import workouts from './workouts';


export default combineReducers({
  app,
  user,
  workouts
});

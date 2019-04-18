import { APP_LOADED } from '../actions';


const initialState = {
  appLoaded: false
};

const app = (state = initialState, { type, payload }) => {
  if (type === APP_LOADED) {
    return { ...state, appLoaded: payload };
  }
  return state;
};

export default app;

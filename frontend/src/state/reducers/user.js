import { CHANGE_USER, LOADING_USER } from '../actions';


const initialState = {
  username: 'Guest'
};

const user = (state = initialState, { type, payload }) => {
  if (type === CHANGE_USER) {
    return { ...payload };
  }
  if (type === LOADING_USER) {
    return { ...state, loadingUser: payload };
  }
  return state;
};

export default user;

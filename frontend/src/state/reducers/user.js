import { CHANGE_USER } from '../actions';


const initialState = {
  username: 'Guest'
};

const user = (state = initialState, { type, payload }) => {
  if (type === CHANGE_USER) {
    return { ...payload };
  }
  return state;
};

export default user;

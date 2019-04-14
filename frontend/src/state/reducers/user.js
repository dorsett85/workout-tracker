import { CHANGE_USER } from '../actions/action-types';


const initialState = {
  name: 'Guest'
};

const user = (state = initialState, { type, payload }) => {
  if (type === CHANGE_USER) {
    return { ...payload };
  }
  return state;
};

export default user;

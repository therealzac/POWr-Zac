import * as types from '../types';

export default function posts(state = [], action={}) {
  switch (action.type) {
    case types.CREATE_POST_SUCCESS:
      return [...state, action.data]
    case types.GET_POSTS_SUCCESS:
      return action.data
    default:
      return state;
  }
};

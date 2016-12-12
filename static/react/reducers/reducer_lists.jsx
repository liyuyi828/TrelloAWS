import { UPDATE_LISTS } from '../actions/index';

const initialState = {
  lists: []
}

export default function( state = initialState, action ) {
  switch(action.type) {
    case UPDATE_LISTS:
      return {
        ...state,
        lists: action.payload
      }
      default:
        return state;
  }
}
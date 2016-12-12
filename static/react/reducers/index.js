import { combineReducers } from 'redux';
import Lists from './reducer_lists';

const rootReducer = combineReducers({
  Lists: Lists
});

export default rootReducer;
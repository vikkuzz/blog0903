import { combineReducers } from 'redux';

import articlesReducer from './articlesReducer';
import userReducer from './userReducer';

export default combineReducers({
  articlesReducer,
  userReducer,
});

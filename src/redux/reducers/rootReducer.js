import { combineReducers } from 'redux';

import articlesReducer from './articlesReducer';
import userReducer from './userReducer';
import loadingReducer from './loadingReducer';

export default combineReducers({
  articlesReducer,
  userReducer,
  loadingReducer,
});

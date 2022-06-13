import { combineReducers } from 'redux';
import { authReducer } from './reducers';

export const reducers = combineReducers({
  auth: authReducer,
});

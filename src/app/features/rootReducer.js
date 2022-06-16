import { combineReducers } from 'redux';
import { authReducer, getAllTasksReducer, getUsersReducer } from './reducers';

export const reducers = combineReducers({
  auth: authReducer,
  getAllTasks: getAllTasksReducer,
  getUsers: getUsersReducer,
});

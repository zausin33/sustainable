import {combineReducers} from 'redux';
import usersSlice from './users/users.slice';
import theme from "./theme/theme.slice";
import status from "./status/status.slice";
import challenges from "./challenges/challenges.slice";

const rootReducer = combineReducers({
  users: usersSlice,
  theme,
  status,
  challenges,
});

export type RootReducer = ReturnType<typeof rootReducer>;

export default rootReducer;

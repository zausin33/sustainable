import {combineReducers} from 'redux';
import usersSlice from './users/users.slice';
import theme from "./theme/theme.slice";

const rootReducer = combineReducers({
  user: usersSlice,
  theme,
});

export type RootReducer = ReturnType<typeof rootReducer>;

export default rootReducer;

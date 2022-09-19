import {ThemeState} from './theme.types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Appearance} from "react-native";

const initialState: ThemeState = {
  isDark: Appearance.getColorScheme() === "dark",
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggle: (state) => {
      state.isDark = !state.isDark;
    },
    setTheme: (state, action: PayloadAction<{ isDark: boolean}>) => {
      const {isDark} = action.payload;
      state.isDark = isDark;
    }
  },
});
export const { toggle, setTheme } = themeSlice.actions;

export default themeSlice.reducer;

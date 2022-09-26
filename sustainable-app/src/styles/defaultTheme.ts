import {DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme,} from '@react-navigation/native';
import {DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme,} from 'react-native-paper';
import defaultColors from "./colors";

const defaultTheme = (isDark: boolean) => {
  const combinedTheme = isDark
    ? { ...NavigationDarkTheme, ...PaperDarkTheme }
    : { ...NavigationDefaultTheme, ...PaperDefaultTheme };
  const colors = isDark
    ? {
        ...NavigationDarkTheme.colors,
        ...PaperDarkTheme.colors,
        ...defaultColors,
      }
    : {
        ...NavigationDefaultTheme.colors,
        ...PaperDefaultTheme.colors,
        ...defaultColors,
      };
  return {
    ...combinedTheme,
    roundness: 10,
    buttonRoundness: 50,
    colors: { ...combinedTheme.colors, ...colors },
  };
};
export default defaultTheme;

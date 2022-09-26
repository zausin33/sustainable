import { Theme as NavigationTheme } from '@react-navigation/native/lib/typescript/src/types';
import { Theme as PaperTheme } from 'react-native-paper/lib/typescript/types';
import fontSize from './fontSize';
import generalStyle from './generalStyle';

interface CustomColors {
  grey: string;
  success: string;
  info: string;
}
export type CombinedColors = NavigationTheme['colors'] &
  PaperTheme['colors'] & CustomColors;
export type CombinedTheme = NavigationTheme & PaperTheme;
declare global {
  namespace ReactNativePaper {
    // eslint-disable-next-line
    interface ThemeColors extends CombinedColors {}
    interface Theme extends CombinedTheme, fontSize, generalStyle {
      buttonRoundness: number;
    }
  }
}

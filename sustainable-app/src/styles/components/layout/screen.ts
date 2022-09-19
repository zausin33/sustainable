import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {SCREEN_HEIGHT, SCREEN_WIDTH, WINDOW_WIDTH,} from '../../../constants/Layout';


const useScreen = () => {
  const theme = useTheme();
  return StyleSheet.create({
    scrollViewContainer: {
      flexGrow: 1,
      justifyContent: 'space-between',
      flexDirection: 'column',
    },
    scrollView: {
      paddingHorizontal: 16,
      width: '100%',
    },
    statusBar: {
      backgroundColor: theme.colors.background,
    },
    background: {
      width: '100%',
      height: '100%',
    },
    imageBackground: {
      width: '100%',
      height: '100%',
    },
    imageStyle: {
      top: 0,
      left: 0,
      width: WINDOW_WIDTH,
      height: undefined,
    },
    androidSafeArea: {
      paddingTop: 30,
    },
    linearGradient: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      position: 'absolute',
      zIndex: 0,
    },
  });
};
export default useScreen;

import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';

const useInputFieldStyles = () => {
  const theme = useTheme();
  return StyleSheet.create({
    textInput: {
      backgroundColor: theme.colors.surface
    },
    icon: {
      paddingTop: 10
    },
    requiredSymbol: {
      color: theme.colors.error,
    },
    height: {
      height: 45,
    },
    multilineHeight: { height: 150 },
  });
};

export default useInputFieldStyles;

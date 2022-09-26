import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';

const useSignUpScreenStyles = () => {
    const theme = useTheme();
    return StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
        },
        headline: {
            alignSelf: "center",
            fontSize: 40,
            fontWeight: "600",
            marginBottom: 10
        },
        headlineImage: {
            width: 250,
            height: 50,
            alignSelf: "center",
            marginBottom: 50
        },
        emailField: {
          marginBottom: 0
        },
        passwordField: {
          marginBottom: 0
        },
    });
};

export default useSignUpScreenStyles;
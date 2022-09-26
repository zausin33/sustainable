import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';

const useLoginScreenStyles = () => {
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
          marginBottom: 15
        },
        passwordField: {
          marginBottom: 15
        },
        textButton: {
            fontSize: 15,
            color: theme.colors.primary,
            fontWeight: "700"
        },
        forgotPassword: {
            alignSelf: "flex-end",
            marginBottom: 50,
        },
        signUpCall: {
            alignSelf: "center",
            fontSize: 15,
            fontWeight: "700",
            marginTop: 20,
        },
        signUp: {
            alignSelf: "center",
            width: "100%",
            marginTop: 0,
            paddingTop: 0,
        }
    });
};

export default useLoginScreenStyles;
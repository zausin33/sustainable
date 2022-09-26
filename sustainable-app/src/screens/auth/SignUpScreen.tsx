import React, {useState} from 'react';
import {Image, View} from 'react-native';
import Screen from "../../components/layout/Screen";
import {Button, Headline, Text} from "react-native-paper"
import InputField from "../../components/core/InputField"
import useSignUpScreenStyles from "../../styles/screens/auth/signUpScreen";
import {signIn, signUp} from "../../store/users/users.slice";
import {useAppDispatch, useAppSelector} from "../../store/hooks";


function SignUpScreen() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [passwordDoesNotMatch, setPasswordDoesNotMatch] = useState(false);
    const [notEverythingFilled, setNotEverythingFilled] = useState(false);
    const isLoading = useAppSelector(state => state.status.isLoading)
    const styles = useSignUpScreenStyles();
    const dispatch = useAppDispatch()

    const performLogin = () => {
        if (!username || !email || !password || !passwordRepeat) {
            setNotEverythingFilled(true);
            return;
        }
        setNotEverythingFilled(false)
        if (password !== passwordRepeat) {
            setPasswordDoesNotMatch(true);
            return;
        }
        setPasswordDoesNotMatch(false);

        dispatch(signUp({username, email, password}));
    }

  return (
    <Screen>
      <View
        style={styles.container}
      >
          <Text style={styles.headline}>
              Create Account
          </Text>
          <Image
            source={require("../../assets/images/logo-transparent.png")}
            resizeMode={"stretch"}
            style={styles.headlineImage}
          />
          <InputField
              label={"Username"}
              value={username}
              onChangeText={(value) => setUsername(value)}
              style={styles.emailField}
              isRequired
              error={notEverythingFilled && !username}
              errorText={"You must give an username"}
          />
          <InputField
              label={"Email"}
              keyboardType={"email-address"}
              value={email}
              onChangeText={(value) => setEmail(value)}
              style={styles.emailField}
              isRequired
              error={notEverythingFilled && !email}
              errorText={"You must give a email-address"}
          />
          <InputField
              label={"Password"}
              secureText
              value={password}
              onChangeText={(value) => setPassword(value)}
              style={styles.passwordField}
              isRequired
              error={notEverythingFilled && !password}
              errorText={"You must give a password"}
          />
          <InputField
              label={"Repeat Password"}
              secureText
              value={passwordRepeat}
              onChangeText={(value) => setPasswordRepeat(value)}
              style={styles.passwordField}
              isRequired
              error={passwordDoesNotMatch || (notEverythingFilled && !passwordRepeat)}
              errorText={notEverythingFilled ? "You must repeat your password" : "Passwords do not match!"}

          />
          <Button mode={"contained"}
                  onPress={performLogin}
                  style={{marginTop: 20}}
                  loading={isLoading}
          >
              Create Account
          </Button>
      </View>
    </Screen>
  );
}

export default SignUpScreen;

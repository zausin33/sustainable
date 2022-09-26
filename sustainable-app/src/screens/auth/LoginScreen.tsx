import React, {useState} from 'react';
import {Image, View} from 'react-native';
import Screen from "../../components/layout/Screen";
import {Button, Headline, Text} from "react-native-paper"
import InputField from "../../components/core/InputField"
import useLoginScreenStyles from "../../styles/screens/auth/loginScreen";
import {signIn} from "../../store/users/users.slice";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useNavigation} from "@react-navigation/native";


function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const styles = useLoginScreenStyles();
    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    const status = useAppSelector(state => state.users.status)
    const isLoading = status === "loading"
    const isError = status === "reject"

    const performLogin = () => {
        dispatch(signIn({username: username, password}))
    }

  return (
    <Screen>
      <View
        style={styles.container}
      >
          <Text style={styles.headline}>
              Welcome
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
              error={isError}
          />
          <InputField
              label={"Password"}
              secureText
              value={password}
              onChangeText={(value) => setPassword(value)}
              style={styles.passwordField}
              error={isError}
          />
          <Button
              style={styles.forgotPassword}
              compact
              uppercase={false}
              onPress={() => console.log("test")}
          >
              <Text style={styles.textButton}>Forgot Password?</Text>
          </Button>
          <Button mode={"contained"}
                  onPress={performLogin}
                  loading={isLoading}
                  disabled={isLoading || !username || !password}
          >
              Sign In
          </Button>
          <Text style={styles.signUpCall}>
              Don't have an account yet?
          </Text>
          <Button
              style={styles.signUp}
              compact
              uppercase={false}
              onPress={() => navigation.navigate("SignUp")}
          >
              <Text style={styles.textButton}>
                  Sign up
              </Text>
          </Button>
      </View>
    </Screen>
  );
}

export default LoginScreen;

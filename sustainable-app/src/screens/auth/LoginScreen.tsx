import React, {useState} from 'react';
import {Image, View} from 'react-native';
import Screen from "../../components/layout/Screen";
import {Button, Headline, Text} from "react-native-paper"
import InputField from "../../components/core/InputField"
import useLoginScreenStyles from "../../styles/screens/auth/loginScreen";
import {login} from "../../store/users/users.slice";
import {useAppDispatch} from "../../store/hooks";
import {useNavigation} from "@react-navigation/native";


function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const styles = useLoginScreenStyles();
    const dispatch = useAppDispatch()
    const navigation = useNavigation()

    const performLogin = () => {
        dispatch(login({username: email, email}))
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
              label={"Email"}
              keyboardType={"email-address"}
              value={email}
              onChangeText={(value) => setEmail(value)}
              style={styles.emailField}
          />
          <InputField
              label={"Password"}
              secureText
              value={password}
              onChangeText={(value) => setPassword(value)}
              style={styles.passwordField}
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

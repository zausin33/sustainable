import React, {useState} from 'react';
import {Image, View} from 'react-native';
import Screen from "../../components/layout/Screen";
import {Button, Headline, Text} from "react-native-paper"
import InputField from "../../components/core/InputField"
import useLoginScreenStyles from "../../styles/screens/auth/loginScreen";
import {login} from "../../store/users/users.slice";
import {useAppDispatch} from "../../store/hooks";


function SignUpScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const styles = useLoginScreenStyles();
    const dispatch = useAppDispatch()

    const performLogin = () => {
        dispatch(login({username: email, email}))
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
              value={email}
              onChangeText={(value) => setEmail(value)}
              style={styles.emailField}
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
          <InputField
              label={"Repeat Password"}
              secureText
              value={password}
              onChangeText={(value) => setPassword(value)}
              style={styles.passwordField}
          />
          <Button mode={"contained"}
                  onPress={performLogin}
          >
              Create Account
          </Button>
      </View>
    </Screen>
  );
}

export default SignUpScreen;

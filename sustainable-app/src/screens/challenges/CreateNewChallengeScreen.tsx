import React from 'react';
import {View} from 'react-native';
import Screen from "../../components/layout/Screen";
import {Button, Text} from "react-native-paper"
import InputField from "../../components/core/InputField"
import useLoginScreenStyles from "../../styles/screens/auth/loginScreen";


function LoginScreen() {
    const styles = useLoginScreenStyles();

  return (
    <Screen>
      <View
        style={styles.container}
      >
          <Text style={styles.headline}>
              Neue Challenge Erstellen
          </Text>
          <InputField
              label={"Name"}
              keyboardType={"email-address"}
              value={""}
              onChangeText={(value) => {}}
              style={styles.emailField}
          />

          <Button mode={"contained"}
                  onPress={() => {}}
          >
              Erstellen
          </Button>
      </View>
    </Screen>
  );
}

export default LoginScreen;

import React from 'react';
import {View} from 'react-native';
import Screen from "../../components/layout/Screen";
import {Button, Checkbox, Headline, Switch, Text} from "react-native-paper"
import InputField from "../../components/core/InputField"
import useLoginScreenStyles from "../../styles/screens/auth/loginScreen";
import TimePicker from "../../components/core/TimePicker";


function CreateNewChallengeScreen() {
    const styles = useLoginScreenStyles();

  return (
    <Screen>
      <View
        style={styles.container}
      >
          <Headline>
              Neue Challenge Erstellen
          </Headline>
          <InputField
              label={"Name der Challenge"}
              placeholder={"z.B. Weniger fleisch essen"}
              value={""}
              onChangeText={(value) => {}}
              style={styles.emailField}
          />
          <InputField
              label={"Beschreibung"}
              placeholder={"z.B. Jeden zweiten Tag kein Fleisch essen"}
              value={""}
              onChangeText={(value) => {}}
              style={styles.emailField}
          />
          <InputField
              label={"Frage"}
              placeholder={"z.B. Hast du heute kein Fleisch gegessen?"}
              value={""}
              onChangeText={(value) => {}}
              style={styles.emailField}
          />
          <View>
              <Text>Ja / Nein</Text>
              <Switch />
              <Text>Messbar</Text>
          </View>

          <InputField
              label={"Einheit"}
              value={"z.B. km"}
              onChangeText={(value) => {}}
              style={styles.emailField}
          />
          <InputField
              label={"Ziel"}
              value={"z.B. 5"}
              onChangeText={(value) => {}}
              style={styles.emailField}
          />
          <TimePicker />
          <InputField
              label={"Wiederholung"}
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

export default CreateNewChallengeScreen;

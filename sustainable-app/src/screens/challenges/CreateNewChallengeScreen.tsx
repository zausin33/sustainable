import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import Screen from "../../components/layout/Screen";
import {Button, Headline, Switch, Text, TextInput, useTheme} from "react-native-paper"
import InputField from "../../components/core/InputField"
import useLoginScreenStyles from "../../styles/screens/auth/loginScreen";
import TimePicker from "../../components/core/TimePicker";
import RepeatModal from "../../components/challenges/RepeatModal";
import useInputFieldStyles from "../../styles/components/core/inputField";


function CreateNewChallengeScreen() {
    const styles = useLoginScreenStyles();
    const inputFieldStyles = useInputFieldStyles();
    const theme = useTheme();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [question, setQuestion] = useState("");
    const [isMeasurable, setIsMeasurable] = useState(false);

    const [showRepeatModal, setShowRepeatModal] = useState(false);

    const selectInputRef = useRef<any>(null);

    const showModal = () => {
        setShowRepeatModal(true);
        if (selectInputRef && selectInputRef.current) {
            selectInputRef.current.blur();
        }
    }

    const hideModal = () => {
        setShowRepeatModal(false);
        if (selectInputRef && selectInputRef.current) {
            selectInputRef.current.blur();
        }
    }

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
              value={name}
              onChangeText={setName}
              style={styles.emailField}
          />
          <InputField
              label={"Beschreibung"}
              placeholder={"z.B. Jeden zweiten Tag kein Fleisch essen"}
              value={description}
              onChangeText={setDescription}
              style={styles.emailField}
          />
          <InputField
              label={"Frage"}
              placeholder={"z.B. Hast du heute kein Fleisch gegessen?"}
              value={question}
              onChangeText={setQuestion}
              style={styles.emailField}
          />
          <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
              marginBottom: 10,
          }}>
              <Text style={isMeasurable ? {'color': theme.colors.disabled} : {}}>Challenge hat keine Einheit, nur geschafft oder nicht</Text>
              <Switch value={isMeasurable} onValueChange={setIsMeasurable}/>
              <Text style={isMeasurable ? {}: {'color': theme.colors.disabled}}>Challenge ist Messbar, z.B. 5km gelaufen</Text>
          </View>
          {isMeasurable &&
              <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
              }}>
                  <View style={{
                      flex: 1,
                      marginRight: 10,
                  }}>
                      <InputField
                          label={"Einheit"}
                          placeholder={"z.B. km"}
                          value={""}
                          onChangeText={(value) => {
                          }}
                          style={styles.emailField}
                      />
                  </View>
                  <View style={{
                      flex: 1,
                  }}>
                      <InputField
                          label={"Ziel"}
                          placeholder={"z.B. 5"}
                          onChangeText={(value) => {
                          }}
                          style={styles.emailField}
                      />
                  </View>
              </View>
          }
          <TextInput
              style={[inputFieldStyles.height, inputFieldStyles.textInput]}
              label={"Häufigkeit"}
              onFocus={showModal}
              ref={selectInputRef}
              value={""}
              mode={"outlined"}
              showSoftInputOnFocus={false}
              right={<TextInput.Icon
                  size={20}
                  icon="chevron-down"
                  style={inputFieldStyles.icon}
              />}/>
          <InputField
              label={"Häufigkeit"}
              value={""}
              onChangeText={(value) => {}}
              style={styles.emailField}
          />
          <TimePicker />

          <Button mode={"contained"}
                  onPress={() => {}}
          >
              Erstellen
          </Button>
          <RepeatModal showModal={showRepeatModal} onDismiss={hideModal}/>
      </View>
    </Screen>
  );
}

export default CreateNewChallengeScreen;

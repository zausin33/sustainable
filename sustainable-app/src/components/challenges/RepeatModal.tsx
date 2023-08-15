import {useRef, useState} from "react";
import {KeyboardTypeOptions, StyleProp, View, ViewStyle} from "react-native";
import * as React from "react";
import {Dialog, Modal, Portal, RadioButton, Text, Button, TextInput} from "react-native-paper";
import InputField from "../core/InputField";
import useLoginScreenStyles from "../../styles/screens/auth/loginScreen";
import useInputFieldStyles from "../../styles/components/core/inputField";

interface RepeatModalProps {
    showModal: boolean;
    onDismiss: () => void;
}

interface SelectionRowState {
    value: string;
    number: number;
}

interface SelectionRow {
    value: string;
    label1: string;
    label2?: string;
    noNumber?: boolean;
}

const RepeatModal: React.FC<RepeatModalProps> = ({showModal, onDismiss}) => {
    const inputFieldStyles = useInputFieldStyles();
    const [value, setValue] = useState('first');
    const selectionRows: SelectionRow[] = [
        {value: "everyDay", label1: "Jeden Tag", noNumber: true},
        {value: "eachDays", label1: "Alle", label2: "Tage"},
        {value: "eachWeek", label1: "", label2: "mal pro Woche"},
        {value: "eachMonth", label1: "", label2: "mal pro Monat"}
        ];

    const [selectionRowsState, setSelectionRowsState] = useState(
        [
            {value: "everyDay", number: 0},
            {value: "eachDays", number: 3},
            {value: "eachWeek", number: 3},
            {value: "eachMonth", number: 10}]
    );

    return (
        <Portal>
            <Dialog visible={showModal} onDismiss={onDismiss}>
                <Dialog.Content>
                    <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                        {selectionRows.map((selectionRow, index) => (
                            <SelectionRow selectionRow={selectionRow}
                                          selectionRowState={selectionRowsState[index]}
                                          setSelectionRowState={setSelectionRowsState}/>
                            ))}
                    </RadioButton.Group>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onDismiss}>Speichern</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}


interface SelectionRowProps {
    selectionRow: SelectionRow;
    selectionRowState: SelectionRowState;
    setSelectionRowState: (selectionRowState: SelectionRowState[]) => void;
}

const SelectionRow: React.FC<SelectionRowProps> = ({selectionRow, selectionRowState, setSelectionRowState}) => {
    const inputRef = useRef<any>(null);
    const inputFieldStyles = useInputFieldStyles();

    const selectInput = () => {
        if (inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    }

    return (
        <View style={{flexDirection: "row", alignItems: "center"}}>
            <RadioButton value={selectionRow.value} onPress={() => selectInput()}/>
            <Text>{selectionRow.label1}</Text>
            {!selectionRow.noNumber && (
                <TextInput
                    ref={inputRef}
                    label={""}
                    value={selectionRowState.number.toString()}
                    keyboardType={"numeric"}
                    mode={"outlined"}
                    style={{...inputFieldStyles.textInput, height: 30, marginLeft: 5, marginRight: 5}}
                />
            )}
            <Text>{selectionRow.label2}</Text>
        </View>
    )
}

export default RepeatModal;
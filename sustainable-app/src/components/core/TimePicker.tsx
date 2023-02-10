import * as React from 'react'
import { Button } from 'react-native-paper'
import { TimePickerModal } from 'react-native-paper-dates'

export default function TimePicker() {
    const [visible, setVisible] = React.useState(false)
    const onDismiss = React.useCallback(() => {
        setVisible(false)
    }, [setVisible])

    const onConfirm = React.useCallback(
        ({ hours, minutes }: {hours: number, minutes: number}) => {
            setVisible(false);
            console.log({ hours, minutes });
        },
        [setVisible]
    );


    return (
        <>
            <TimePickerModal
                visible={visible}
                onDismiss={onDismiss}
                onConfirm={onConfirm}
                hours={12} // default: current hours
                minutes={14} // default: current minutes
                label="Select time" // optional, default 'Select time'
                uppercase={false} // optional, default is true
                cancelLabel="Cancel" // optional, default: 'Cancel'
                confirmLabel="Ok" // optional, default: 'Ok'
                animationType="fade" // optional, default is 'none'
                locale="de" // optional, default is automically detected by your system
                // keyboardIcon="keyboard-outline" // optional, default is "keyboard-outline"
                // clockIcon="clock-outline" // optional, default is "clock-outline"
            />
            <Button onPress={()=> setVisible(true)}>
                Pick time
            </Button>
        </>
    )
}
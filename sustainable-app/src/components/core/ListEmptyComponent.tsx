import React from 'react';
import {View} from "react-native";
import {Text} from "react-native-paper";

type ListEmptyComponentProps = {
    text: string
}

const ListEmptyComponent: React.FC<ListEmptyComponentProps> = ({text}) => {
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>{text}</Text>
        </View>

    );
}

export default ListEmptyComponent;
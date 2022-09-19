import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import Screen from "../../components/layout/Screen";
import {Card, Colors, FAB, ProgressBar, Text, useTheme, Searchbar, Button} from "react-native-paper"
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

type Challenge = {
    id: string;
    name: string;
    category: null;
    measurable: boolean;
    frequency: string;
    note: string;
}

const globalChallenges: Challenge[] = [
    {
        id: "1",
        name: "Laufen",
        category: null,
        measurable: false,
        frequency: "daily",
        note: "Geh laufen du Stück!",

    },
    {
        id: "2",
        name: "Springen",
        category: null,
        measurable: true,
        frequency: "daily",
        note: "Geh laufen du Stück!",

    },
    {
        id: "3",
        name: "Hüpfen",
        category: null,
        measurable: false,
        frequency: "daily",
        note: "Geh laufen du Stück!",

    },
    {
        id: "4",
        name: "Gehen",
        category: null,
        measurable: false,
        frequency: "daily",
        note: "Geh laufen du Stück!",

    },
    {
        id: "5",
        name: "Hüpfen",
        category: null,
        measurable: false,
        frequency: "daily",
        note: "Geh laufen du Stück!",

    },
    {
        id: "6",
        name: "Gehen",
        category: null,
        measurable: false,
        frequency: "daily",
        note: "Geh laufen du Stück!",

    },
    {
        id: "7",
        name: "Hüpfen",
        category: null,
        measurable: false,
        frequency: "daily",
        note: "Geh laufen du Stück!",

    },
    {
        id: "8",
        name: "Gehen",
        category: null,
        measurable: false,
        frequency: "daily",
        note: "Geh laufen du Stück!",

    },
    {
        id: "9",
        name: "Hüpfen",
        category: null,
        measurable: false,
        frequency: "daily",
        note: "Geh laufen du Stück!",

    },
    {
        id: "10",
        name: "Gehen",
        category: null,
        measurable: false,
        frequency: "daily",
        note: "Geh laufen du Stück!",

    },
    {
        id: "11",
        name: "Hüpfen",
        category: null,
        measurable: false,
        frequency: "daily",
        note: "Geh laufen du Stück!",

    },
    {
        id: "12",
        name: "Gehen",
        category: null,
        measurable: false,
        frequency: "daily",
        note: "Geh laufen du Stück!",

    }
]

function SelectNewChallengeScreen() {
    const navigation = useNavigation()

  return (
    <Screen isScrollView={false}>
        <>
            <View style={{flex: 1}}>
                <Searchbar value={"123"}/>
                <FlatList
                    data={globalChallenges}
                    renderItem={renderItem => <ChallengeCard  challenge={renderItem.item}/>}
                    keyExtractor={renderItem => renderItem.id}
                />
                <Button mode={"contained"} onPress={() => navigation.navigate("CreateNewChallengeScreen")}>
                    Eigene Challenge Definieren
                </Button>
            </View>
        </>
    </Screen>

  );
}

type ChallengeCardProps = {
    challenge: Challenge;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({challenge}) => {
    return (
        <Card style={{marginBottom: 30, paddingHorizontal: 10, paddingVertical: 5}}>
            <Text style={{fontWeight: "700", marginBottom: 5, fontSize: 16}}>{challenge.name}</Text>
            <Text>{challenge.note}</Text>
        </Card>
    );
}

export default SelectNewChallengeScreen;

import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import Screen from "../../components/layout/Screen";
import {Button, Card, Divider, Searchbar, Text} from "react-native-paper"
import {useNavigation} from "@react-navigation/native";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {getGlobalChallenges} from "../../store/challenges/challenges.slice";
import {GlobalChallenge} from "../../store/challenges/challenges.types";
import ListEmptyComponent from "../../components/core/ListEmptyComponent";
import {ChallengeStackScreenProps} from "../../navigation/Navigation.types";


function SelectNewChallengeScreen() {
    const navigation = useNavigation<ChallengeStackScreenProps<"SelectNewChallengeScreen">["navigation"]>()
    const dispatch = useAppDispatch();
    const allGlobalChallenges = useAppSelector(state => state.challenges.globalChallenges);
    const [searchText, setSearchText] = useState("")
    const [globalChallenges, setGlobalChallenges] = useState(allGlobalChallenges)
    const isWithSearch = Boolean(searchText)

    useEffect(() => {
        dispatch(getGlobalChallenges())
    }, [])

    const doSearch = (value: string) => {
        setSearchText(value)
        let newGlobalChallenges;
        if (value) {
            newGlobalChallenges = allGlobalChallenges.filter(challenge => challenge.name.toLowerCase().includes(value.toLowerCase()));
        } else {
            newGlobalChallenges = allGlobalChallenges;
        }
        setGlobalChallenges(newGlobalChallenges);
    }


  return (
    <Screen isScrollView={false}>
        <>
            <View style={{flex: 1, marginVertical: 20}}>
                <Searchbar value={searchText}
                           onChangeText={value => doSearch(value)}/>
                <FlatList
                    data={globalChallenges}
                    renderItem={renderItem => <ChallengeCard  challenge={renderItem.item}/>}
                    keyExtractor={renderItem => renderItem.id}
                    ListEmptyComponent={<ListEmptyComponent text={isWithSearch ? "No results" : "There are no global challenges yet"} />}
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
    challenge: GlobalChallenge;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({challenge}) => {
    return (
        <Card style={{marginTop: 30, paddingHorizontal: 10, paddingVertical: 5}}>
            <Text style={{fontWeight: "700", marginBottom: 5, fontSize: 16}}>{challenge.name}</Text>
            {challenge.note && (
                <Text>Anmerkung: {challenge.note}</Text>
            )}
            {challenge.question && challenge.note && (
                <Divider style={{marginVertical: 3}}/>
            )}
            {challenge.question && (
                <Text>Frage: {challenge.question}</Text>
            )}
        </Card>
    );
}

export default SelectNewChallengeScreen;

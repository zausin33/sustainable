import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import Screen from "../../components/layout/Screen";
import {Card, Colors, FAB, ProgressBar, Text, useTheme} from "react-native-paper"
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

const challenges: Challenge[] = [
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

function ChallengeOverviewScreen() {
    const navigation = useNavigation()

  return (
    <Screen isScrollView={false}>
        <>
            <View style={{flex: 1}}>
                <FlatList
                    data={challenges}
                    renderItem={renderItem => <ChallengeCard  challenge={renderItem.item}/>}
                    keyExtractor={renderItem => renderItem.id}
                />
                <Text style={{marginVertical: 30}}>
                    Du bist bei allen Challenges auf dem aktuellen Stand
                </Text>
            </View>
            <FAB
                style={{
                    position: 'absolute',
                    margin: 16,
                    right: 0,
                    bottom: 0
                }}
                icon="plus"
                onPress={() => navigation.navigate("SelectNewChallengeScreen")}
            />
        </>
    </Screen>

  );
}

type ChallengeCardProps = {
    challenge: Challenge;
}

type CalendarDay = {
    dayName: string
    dayNumber: number;
    date: Date;
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({challenge}) => {
    const INITIAL_DAYS_SHOWN = 10
    const [offsetStart, setOffsetStart] = useState(0)
    const [offsetEnd, setOffsetEnd] = useState(INITIAL_DAYS_SHOWN)
    const [isRefreshing, setRefreshing] = useState(false);

    const calculateLastDays = (offsetStart: number, offsetEnd: number) => {
        const dayNames = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"] // Todo language
        const currentDate = new Date()
        const startDate = new Date(currentDate.setDate(currentDate.getDate() - offsetStart))
        const returnDays: CalendarDay[] = []
        for (let i = 0; i <= offsetEnd; i++) {
            const returnDay = new Date(startDate.setDate(startDate.getDate() - 1))
            const day = dayNames[returnDay.getDay()]
            const date = returnDay.getDate()
            returnDays.push({dayName: day, dayNumber: date, date: returnDay})
        }
        return returnDays
    };

    const onRefresh = () => {
        setRefreshing(true)
        const newOffsetStart = offsetEnd
        const newOffsetEnd = offsetEnd + INITIAL_DAYS_SHOWN
        const newReturnDays = calculateLastDays(newOffsetStart, newOffsetEnd);
        setOffsetStart(newOffsetStart);
        setOffsetEnd(newOffsetEnd);
        setDays([...days, ...newReturnDays])
        setRefreshing(false)
    }

    const [days, setDays] = useState(calculateLastDays(offsetStart, offsetEnd))

    return (
        <Card style={{marginBottom: 30, paddingHorizontal: 10, paddingVertical: 5}}>
            <Text style={{fontWeight: "700", marginBottom: 5, fontSize: 16}}>{challenge.name}</Text>
            <FlatList data={days}
                      renderItem={({item}) => (
                          <View style={{alignItems: "center", paddingRight: 30}}>
                              <View style={{flexDirection: "row"}}>
                                  <Text style={{paddingRight: 5}}>
                                      {item.dayName}
                                  </Text>
                                  <Text>
                                      {item.dayNumber}
                                  </Text>
                              </View>
                              {challenge.measurable ? (
                                  <>
                                      <Text> 1 </Text>
                                      <Text>Einheit</Text>
                                  </>
                              ) : (
                                  <MaterialCommunityIcons name={"check"} size={30}/>
                              )}

                          </View>
                          )
                      }
                      style={{marginBottom: 10}}
                      horizontal
                      keyExtractor={day => day.date.toString()}
                      onEndReached={onRefresh}
                      refreshing={isRefreshing}
                      showsHorizontalScrollIndicator={false}
            />
            <ProgressBar progress={0.5} color={Colors.red800} />
        </Card>
    );
}

export default ChallengeOverviewScreen;

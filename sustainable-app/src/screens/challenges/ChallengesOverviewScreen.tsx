import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import Screen from "../../components/layout/Screen";
import {Card, Colors, FAB, ProgressBar, Text, useTheme} from "react-native-paper"
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {useAppSelector} from "../../store/hooks";
import ListEmptyComponent from "../../components/core/ListEmptyComponent";
import {ChallengeStackScreenProps} from "../../navigation/Navigation.types";
import {Challenge} from "../../store/challenges/challenges.types";

function ChallengeOverviewScreen() {
    const navigation = useNavigation<ChallengeStackScreenProps<"ChallengeOverviewScreen">["navigation"]>()
    const challenges = useAppSelector(state => state.users.current?.challenges)

  return (
      // TODO refetch challenges when entering this page
    <Screen isScrollView={false}>
        <>
            <View style={{flex: 1}}>
                <FlatList
                    data={challenges}
                    renderItem={renderItem => <ChallengeCard  challenge={renderItem.item}/>}
                    keyExtractor={renderItem => renderItem.id}
                    ListEmptyComponent={<ListEmptyComponent text={"You have no challenges yet"} />}
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
                    bottom: 50
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
    const theme = useTheme();

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
        <Card style={{marginTop: 30, paddingHorizontal: 10, paddingVertical: 5}}>
            <Text style={{fontWeight: "700", marginBottom: 5, fontSize: 16}}>{challenge.name}</Text>
            <FlatList data={days}
                      renderItem={({item}) => (
                          <View style={{alignItems: "center", paddingRight: 30, marginBottom: 5}}>
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
                                  <MaterialCommunityIcons name={"check"} size={30} color={theme.colors.primary}/>
                              )}

                          </View>
                          )
                      }
                      style={{marginBottom: 10}}
                      horizontal
                      keyExtractor={day => day.date.toString()}
                      onEndReached={onRefresh}
                      refreshing={isRefreshing}
                      showsHorizontalScrollIndicator={true}
            />
            <ProgressBar progress={0.5} color={theme.colors.primary} />
        </Card>
    );
}

export default ChallengeOverviewScreen;

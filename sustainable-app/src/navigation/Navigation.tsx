/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {FontAwesome} from '@expo/vector-icons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {Pressable, Text, View} from 'react-native';
import ModalScreen from '../screens/ModalScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import {RootStackParamList, RootTabParamList, RootTabScreenProps} from './Navigation.types';
import LoginScreen from "../screens/auth/LoginScreen";
import Header, {AccountIcon, LogoTitle} from '../components/layout/Header'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {useAppSelector} from "../store/hooks";
import {useTheme} from "react-native-paper";
import ChallengeOverviewScreen from "../screens/challenges/ChallengesOverviewScreen";
import {createDrawerNavigator} from "@react-navigation/drawer";
import SettingsDrawerContent from "../components/layout/DrawerContent";
import SelectNewChallengeScreen from "../screens/challenges/SelectNewChallengeScreen";
import CreateNewChallengeScreen from "../screens/challenges/CreateNewChallengeScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const RootStack = createNativeStackNavigator();

export default  function RootNavigator() {
    const isLoggedIn = useAppSelector(state => Boolean(state.users.current?.token))

  return (
    <RootStack.Navigator
        screenOptions={{
            headerRight: () => <LogoTitle />,
            headerTitle: "",
            headerShown: !isLoggedIn
        }}
    >
        {isLoggedIn ? (
            <>
                <RootStack.Screen name="Drawer" component={DrawerNavigator} />
                <RootStack.Group screenOptions={{ presentation: 'modal' }}>
                    <RootStack.Screen name="Modal" component={ModalScreen} />
                </RootStack.Group>
            </>
        ) : (
            <>
                <RootStack.Screen name="Login" component={LoginScreen} options={{ headerShown: true }} />
                <RootStack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: true }} />
            </>
        )}
    </RootStack.Navigator>
  );
}

/**
 * The Drawer Navigator
 */
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
    return (
        <Drawer.Navigator
            drawerContent={() => <SettingsDrawerContent />}
            screenOptions={{
                headerRight: () => <LogoTitle />,
                headerTitle: "",
                headerLeft: () => <AccountIcon />,
            }}
        >
            <RootStack.Screen name="Root" component={BottomTabNavigator} />
        </Drawer.Navigator>
    );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
    const theme = useTheme()

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
          tabBarStyle: { height: 55, paddingBottom: 5 },
          headerShown: false
      }}
    >
        <BottomTab.Screen
            name="ChallengeOverview"
            component={ChallengeStackNavigator}
            options={{
                title: "Challenge Overview",
                tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
            }}
        />
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="pencil" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={"#000"}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="info" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={26} {...props} />;
}

/**
 * The challenge stack navigator.
 */
const ChallengeStack = createNativeStackNavigator();

function ChallengeStackNavigator() {
    return (
        <ChallengeStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <RootStack.Screen name="ChallengeOverviewScreen" component={ChallengeOverviewScreen} />
            <RootStack.Screen name="SelectNewChallengeScreen" component={SelectNewChallengeScreen} />
            <RootStack.Screen name="CreateNewChallengeScreen" component={CreateNewChallengeScreen} />
        </ChallengeStack.Navigator>
    );
}

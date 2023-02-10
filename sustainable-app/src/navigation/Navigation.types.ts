/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps, NavigatorScreenParams} from '@react-navigation/native';
import {StackScreenProps} from "@react-navigation/stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList>;
  Drawer: undefined;
  Modal: undefined;
  Login: undefined;
  SignUp: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
    StackScreenProps<RootStackParamList, T>;

export type RootTabParamList = {
  ChallengeOverview: NavigatorScreenParams<ChallengeStackParamList>;
  TabOne: undefined;
  TabTwo: undefined;
};

export type RootTabScreenProps<T extends keyof RootTabParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<RootTabParamList, T>,
        RootStackScreenProps<keyof RootStackParamList>
        >;

export type ChallengeStackParamList = {
  ChallengeOverviewScreen: undefined;
  SelectNewChallengeScreen: undefined;
  CreateNewChallengeScreen: undefined;
};

export type ChallengeStackScreenProps<T extends keyof ChallengeStackParamList> =
    CompositeScreenProps<
        StackScreenProps<ChallengeStackParamList, T>,
        RootTabScreenProps<keyof RootTabParamList>
        >;

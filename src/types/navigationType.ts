import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  DASHBOARD: undefined;
};

export type RootTabParamList = {
  HOME: undefined;
  EXPLORE: undefined;
};

type ScreenList = RootStackParamList & RootTabParamList;
export type ScreenProps<screenName extends keyof ScreenList> =
  NativeStackNavigationProp<ScreenList, screenName>;
export type RouteParams<screenName extends keyof ScreenList> = RouteProp<
  ScreenList,
  screenName
>;

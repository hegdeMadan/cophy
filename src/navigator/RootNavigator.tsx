import React from 'react';
import { StatusBar } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { moderateScale } from 'react-native-size-matters';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { constants } from '.';
import Home from '../home/Home';
import { HomeIcon, ExploreIcon } from './TabBarIcons';
import { RootStackParamList, RootTabParamList } from '../types/navigationType';
import Explore from '../explore/Explore';
import { scale } from '../utils';
import { colors } from '../theme';

export default function RootNavigator() {
  const { screens } = constants;
  const { Navigator, Screen } =
    createNativeStackNavigator<RootStackParamList>();
  const Tab = createBottomTabNavigator<RootTabParamList>();

  const BottomTab = () => {
    return (
      <Tab.Navigator
        initialRouteName={screens.home}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: colors.background,
            height: scale(52),
            borderTopWidth: 0,
          },
        }}>
        <Tab.Screen
          name={screens.home}
          component={Home}
          options={{
            tabBarIcon: HomeIcon,
          }}
        />
        <Tab.Screen
          name={screens.explore}
          component={Explore}
          options={{
            tabBarIcon: ExploreIcon,
          }}
        />
      </Tab.Navigator>
    );
  };

  const navigationDefaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.background,
    },
  };

  const initalRouteName = screens.dashBoard;

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={colors.background} barStyle="light-content" />
      <NavigationContainer theme={navigationDefaultTheme}>
        <Navigator
          initialRouteName={initalRouteName}
          screenOptions={{ headerShown: false }}>
          <Screen name={screens.dashBoard} component={BottomTab} />
        </Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

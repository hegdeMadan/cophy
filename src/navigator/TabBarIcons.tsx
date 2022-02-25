import * as React from 'react';
import { View } from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { scale } from '../utils';

type Props = { color: string; focused: boolean };

export const HomeIcon = ({ color, focused }: Props) => {
  return (
    <View>
      <AntIcon name="home" color={color} size={scale(28)} />
    </View>
  );
};

export const ExploreIcon = ({ color, focused }: Props) => {
  return (
    <View>
      <MaterialIcon name="explore" color={color} size={scale(28)} />
    </View>
  );
};

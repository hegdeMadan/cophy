import * as React from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../theme';
import { scale } from '../utils';

type Props = { color: string; focused: boolean };

export const HomeIcon = ({ color, focused }: Props) => {
  return (
    <AntIcon
      name="home"
      color={focused ? colors.primary : colors.onSurface}
      size={scale(28)}
    />
  );
};

export const ExploreIcon = ({ color, focused }: Props) => {
  return (
    <AntIcon
      name="appstore-o"
      color={focused ? colors.primary : colors.onSurface}
      size={scale(28)}
    />
  );
};

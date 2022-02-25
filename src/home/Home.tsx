import React from 'react';
import { Text, View } from 'react-native';
import { ScreenProps, RouteParams } from '../types/navigationType';

type Props = {
  navigation: ScreenProps<'HOME'>;
  route: RouteParams<'HOME'>;
};

const Home: React.FC<Props> = ({ navigation, route }: Props) => {
  return (
    <View>
      <Text>Home!</Text>
    </View>
  );
};

export default Home;

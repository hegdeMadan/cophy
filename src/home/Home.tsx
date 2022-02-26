import { GIFObject, MultiResponse } from 'giphy-api';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import ImageComponent from '../component/ImageComponent';
import CustomText from '../component/Text';
import { API_KEY, BASE_URL } from '../constants';
import { colors, fonts } from '../theme';
import { ScreenProps, RouteParams } from '../types/navigationType';
import { customFetchApi, scale } from '../utils';

type Props = {
  navigation: ScreenProps<'HOME'>;
  route: RouteParams<'HOME'>;
};

const Home: React.FC<Props> = ({ navigation, route }: Props) => {
  const [gifData, setGifs] = useState<MultiResponse['data'] | []>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const fetchGifs = async () => {
    if (totalCount && gifData.length >= totalCount) {
      return;
    }
    const response = await customFetchApi(
      `trending?api_key=${API_KEY}&limit=${10}&offset=${gifData.length}`,
    );
    console.log(response);
    const { data, pagination } = response;
    setGifs([...gifData, ...data]);
    setTotalCount(pagination.totalCount);
  };

  useEffect(() => {
    fetchGifs();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.logoWrapper}>
        <CustomText text="COFY" textStyle={styles.logo} />
      </View>
      {gifData.length ? (
        <ImageComponent gifData={gifData} onEndReached={() => fetchGifs()} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  logoWrapper: {
    width: '100%',
    height: scale(52),
    justifyContent: 'center',
    paddingHorizontal: scale(12),
    borderBottomColor: colors.surface,
    borderBottomWidth: 1,
  },
  logo: {
    color: colors.primary,
    fontSize: scale(28),
    fontFamily: fonts.AbrilFatfaceRegular,
    letterSpacing: 1,
  },
});

export default Home;

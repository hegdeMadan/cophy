import { MultiResponse } from 'giphy-api';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import ImageComponent from '../component/ImageComponent';
import CustomText from '../component/Text';
import { API_KEY } from '../constants';
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>();

  const fetchGifs = async () => {
    if (totalCount && gifData.length >= totalCount) {
      return;
    }
    try {
      const response = await customFetchApi(
        `trending?api_key=${API_KEY}&limit=${10}&offset=${gifData.length}`,
      );
      if (response?.errorName === 'AbortError') {
        setError(response.errorMessage);
        setIsLoading(false);
        return;
      }
      const { data, pagination } = response;
      setError('');
      setIsLoading(false);
      setGifs([...gifData, ...data]);
      setTotalCount(pagination.totalCount);
    } catch (err) {
      setError('something went wrong');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGifs();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centerView}>
        <ActivityIndicator color={colors.primary} size={scale(28)} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.logoWrapper}>
        <CustomText text="COPHY" textStyle={styles.logo} />
      </View>
      {error ? (
        <View style={styles.centerView}>
          <CustomText
            text={error}
            textStyle={{ color: colors.error, fontSize: scale(16) }}
          />
          <TouchableOpacity style={styles.tryAgain} onPress={() => fetchGifs()}>
            <CustomText
              text="try again"
              textStyle={{ color: colors.onPrimary, fontSize: scale(16) }}
            />
          </TouchableOpacity>
        </View>
      ) : null}
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
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tryAgain: {
    backgroundColor: colors.secondary,
    borderColor: colors.surface,
    borderWidth: 1,
    padding: scale(8),
    borderRadius: scale(8),
    marginTop: scale(12),
  },
});

export default Home;

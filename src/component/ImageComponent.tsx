import { GIFObject, MultiResponse } from 'giphy-api';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { colors, fonts } from '../theme';
import { scale } from '../utils';
import Chips from './Chips';
import CustomText from './Text';

type Props = {
  gifData: MultiResponse['data'];
  onEndReached: () => void;
};

type ImagePath = [
  'fixed_height_small',
  'fixed_height_downsampled',
  'downsized_medium',
];

const ImageComponent = ({ gifData, onEndReached }: Props) => {
  const { width: viewWidth } = Dimensions.get('window');
  const flatlistRef = useRef<FlatList>();
  const [resolutionTypeIndex, setResolutionType] = useState(0);
  const [showScrollTop, setScrollToTop] = useState(false);
  const imagePath: ImagePath = [
    'fixed_height_small',
    'fixed_height_downsampled',
    'downsized_medium',
  ];

  const _renderItem = ({ item, index }: { item: GIFObject; index: number }) => {
    // console.log(item.user?.avatar_url);
    const { url, height, width } = item.images[imagePath[resolutionTypeIndex]];
    const scaledHeight = +height * (viewWidth / +width);
    const colorIndex = index > 8 ? index % 8 : index;
    return (
      <View style={styles.post}>
        <View style={styles.user}>
          <Icon
            name="person-circle"
            size={scale(36)}
            color={colors.secondary}
            style={{ marginRight: scale(8) }}
          />
          <View style={styles.userNameWrapper}>
            <Text style={[styles.userName, styles.displayName]}>
              {item.user?.display_name || 'Giphy'}
            </Text>
            <Text style={styles.userName}>@{item.username || 'giphy'}</Text>
          </View>
        </View>
        <Image
          source={{
            uri: url,
          }}
          style={{
            width: viewWidth,
            height: scaledHeight,
            backgroundColor: colors.complementoryColors[colorIndex],
          }}
          resizeMode="contain"
        />
      </View>
    );
  };

  const ListFooter = () => {
    return (
      <ActivityIndicator
        color={colors.primary}
        size={scale(28)}
        style={styles.loader}
      />
    );
  };

  const showScrollTopButton = nativeEvent => {
    if (nativeEvent.contentOffset.y > 2500) {
      setScrollToTop(true);
      return;
    }

    if (showScrollTop) setScrollToTop(false)
  };

  const scrollToTop = () => {
    console.log('scrollToTop fired');
    flatlistRef &&
      flatlistRef.current?.scrollToOffset({ animated: true, offset: 0 });
  };

  return (
    <View style={styles.container}>
      {showScrollTop ? (
        <TouchableOpacity
          style={styles.scrollToTopButton}
          onPress={() => scrollToTop()}>
          <MaterialIcon
            name="keyboard-arrow-up"
            color={colors.onSecondary}
            size={scale(18)}
          />
        </TouchableOpacity>
      ) : null}
      {gifData.length ? (
        <FlatList
          ref={flatlistRef}
          style={styles.container}
          data={gifData}
          renderItem={_renderItem}
          keyExtractor={(item, index: number) => index.toString()}
          onEndReached={() => onEndReached()}
          onEndReachedThreshold={1}
          onScroll={({ nativeEvent }) => showScrollTopButton(nativeEvent)}
          ListFooterComponent={() => ListFooter()}
          ListHeaderComponent={() => (
            <Chips
              clipTypes={['low', 'medium', 'high']}
              setItem={setResolutionType}
              selectedTypeIndex={resolutionTypeIndex}
            />
          )}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  post: {
    marginBottom: scale(28),
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(8),
    paddingHorizontal: scale(4),
  },
  displayName: {
    fontSize: scale(12),
    color: colors.onSurface,
  },
  userName: {
    color: colors.placeHolder,
    fontFamily: fonts.AxiformaMedium,
    letterSpacing: 0.3,
    fontSize: scale(10),
  },
  loader: {
    paddingVertical: scale(24),
  },
  switchSize: {
    width: '100%',
    height: scale(52),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  sizeSwitchButton: {
    backgroundColor: colors.secondary,
    width: scale(68),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(12),
    paddingVertical: scale(8),
  },
  scrollToTopButton: {
    position: 'absolute',
    bottom: '5%',
    right: '5%',
    zIndex: 4,
    width: scale(40),
    height: scale(40),
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});

export default ImageComponent;

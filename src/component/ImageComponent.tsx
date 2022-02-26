import { GIFObject, MultiResponse } from 'giphy-api';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, fonts } from '../theme';
import { scale } from '../utils';

type Props = {
  gifData: MultiResponse['data'];
  onEndReached: () => void;
};

const ImageComponent = ({ gifData, onEndReached }: Props) => {
  const { width: viewWidth } = Dimensions.get('window');

  const _renderItem = ({ item, index }: { item: GIFObject; index: number }) => {
    // console.log(item.user?.avatar_url);
    const { url, height, width } = item.images.downsized_medium;
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

  return (
    <View style={styles.container}>
      {gifData.length ? (
        <FlatList
          style={styles.container}
          data={gifData}
          renderItem={_renderItem}
          keyExtractor={(item, index: number) => index.toString()}
          onEndReached={() => onEndReached()}
          onEndReachedThreshold={1}
          // numColumns={2}
          ListFooterComponent={() => ListFooter()}
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
});

export default ImageComponent;

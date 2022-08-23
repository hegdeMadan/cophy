import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { colors, fonts } from '../theme';
import { customFetchApi, scale } from '../utils';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { MultiResponse } from 'giphy-api';
import { API_KEY } from '../constants';
import ImageComponent from '../component/ImageComponent';
import CustomText from '../component/Text';
import search from '../assets/search.webp';

const Explore: React.FC = () => {
  const [gifData, setGifs] = useState<MultiResponse['data'] | []>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  let timeoutInstance: ReturnType<typeof setTimeout>;

  const searchGifs = (searchInput: string) => {
    clearTimeout(timeoutInstance);
    if (!searchInput) {
      setSearchValue('');
      setGifs([]);
      return;
    }

    if (totalCount && gifData.length >= totalCount) {
      return;
    }

    try {
      timeoutInstance = setTimeout(async () => {
        setSearchValue(searchInput);
        setIsSearching(true);
        if (!searchHistory.includes(searchInput)) {
          setSearchHistory([...searchHistory, searchInput]);
        }
        const response = await customFetchApi(
          `search?api_key=${API_KEY}&limit=${10}&offset=${
            gifData.length
          }&q=${searchInput}`,
        );
        if (response?.errorName === 'AbortError') {
          setError(response.errorMessage);
          setIsSearching(false);
          return;
        }
        console.log(response, gifData);
        const { data, pagination } = response;
        const updatedGifs = searchHistory.includes(searchInput)
          ? [...gifData, ...data]
          : [...data];
        const errorMsg = !data.length ? 'no data found' : '';
        setIsSearching(false);
        setError(errorMsg);
        setGifs([...updatedGifs]);
        setTotalCount(pagination.totalCount);
        Keyboard.dismiss();
      }, 700);
    } catch (err) {
      setIsSearching(false);
      setError('something  went wrong');
    }
  };

  const removeFromSearchHistory = (item: string) => {
    console.log(item);
    const indexOfItem = searchHistory.indexOf(item);
    const history = [...searchHistory];
    history.splice(indexOfItem, 1);
    setSearchHistory(history);
  };

  const _renderSearchList = ({ item }: { item: string }) => (
    <View style={styles.searchItemWrapper}>
      <TouchableOpacity
        style={styles.searchHistoryItem}
        onPress={() => searchGifs(item)}>
        <MaterialIcon
          name="history"
          size={scale(18)}
          color={colors.onSurface}
          style={styles.historyIcon}
        />
        <CustomText text={item} textStyle={styles.textStyle} />
      </TouchableOpacity>
      <MaterialIcon
        name="close"
        color={colors.placeHolder}
        size={scale(16)}
        onPress={() => removeFromSearchHistory(item)}
      />
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.container}>
        <View style={[styles.searchView]}>
          <View style={[styles.searchContainer]}>
            <TextInput
              placeholder="search 'lol', 'funny', 'thank you' or anything"
              onChangeText={(val: string) => searchGifs(val)}
              style={styles.textInput}
            />
            {isSearching ? (
              <ActivityIndicator color={colors.secondary} size={scale(20)} />
            ) : (
              <IonIcon
                name="search"
                size={scale(20)}
                color={colors.onSurface}
              />
            )}
          </View>
          {!gifData.length ? (
            <View style={[styles.historyList]}>
              <FlatList
                data={searchHistory}
                renderItem={_renderSearchList}
                keyExtractor={(item, index: number) => index.toString()}
              />
            </View>
          ) : null}
        </View>
        {error ? (
          <CustomText text={error} textStyle={styles.errorText} />
        ) : null}
        {gifData.length ? (
          <ImageComponent
            gifData={gifData}
            onEndReached={() => searchGifs(searchValue)}
          />
        ) : (
          <Image source={search} style={styles.searchImage} />
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchView: {
    backgroundColor: colors.surface,
    width: '94%',
    // backgroundColor: colors.surface,
    alignSelf: 'center',
    borderRadius: scale(16),
  },
  searchContainer: {
    height: scale(36),
    flexDirection: 'row',
    alignItems: 'center',
    // marginVertical: scale(4),
    paddingHorizontal: scale(8),
    borderBottomColor: colors.background,
    borderBottomWidth: 0.5,
  },
  textInput: {
    flex: 1,
    fontFamily: fonts.AxiformaRegular,
    color: colors.placeHolder,
  },
  textStyle: {
    fontSize: scale(14),
  },
  historyList: {
    width: '94%',
    alignSelf: 'center',
    maxHeight: scale(800),
    paddingHorizontal: '5%',
  },
  searchHistoryItem: {
    paddingVertical: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchItemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: scale(4),
  },
  historyIcon: {
    marginRight: scale(8),
  },
  searchImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  errorText: {
    color: colors.error,
    fontSize: scale(16),
    textAlign: 'center',
    marginTop: scale(8),
  },
});

export default Explore;

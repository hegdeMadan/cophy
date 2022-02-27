/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme';
import { scale } from '../utils';
import CustomText from './Text';

type Props = {
  clipTypes: Array<string>;
  setItem: Function;
  selectedTypeIndex: number;
};

const Chips: React.FC<Props> = ({
  clipTypes,
  setItem,
  selectedTypeIndex,
}: Props) => {
  return (
    <View
      style={{
        marginBottom: scale(8),
        borderBottomColor: colors.surface,
        borderBottomWidth: 1,
        paddingBottom: scale(8),
      }}>
      <CustomText
        text="Image quality"
        textStyle={{ marginLeft: scale(12), marginVertical: scale(8) }}
      />
      <View style={styles.chipsContainer}>
        {clipTypes.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              ...styles.chip,
              backgroundColor:
                index === selectedTypeIndex ? colors.primary : 'transparent',
            }}
            key={index}
            onPress={() => setItem(index)}>
            <CustomText text={item} textStyle={{ color: colors.onPrimary }} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chipsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
  },
  chip: {
    paddingHorizontal: scale(28),
    height: scale(40),
    borderRadius: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
});

export default Chips;

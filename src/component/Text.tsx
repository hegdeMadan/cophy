import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { colors, fonts } from '../theme';

type Props = {
  text: string;
  textStyle?: TextStyle;
};

const CustomText = ({ text, textStyle }: Props) => {
  return <Text style={[styles.text, textStyle]}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: colors.onSurface,
    fontFamily: fonts.AxiformaRegular,
  },
});

export default CustomText;

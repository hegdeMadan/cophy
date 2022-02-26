import { Dimensions } from 'react-native';
import { BASE_URL } from './constants';
import { colors } from './theme';

const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

// Default guideline sizes are based on standard ~5" screen mobile device
const baseWidth = 350;
const baseHeight = 680;

export const scale = (size: number) => (shortDimension / baseWidth) * size;
export const verticalScale = (size: number) =>
  (longDimension / baseHeight) * size;
export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;
export const moderateVerticalScale = (size: number, factor = 0.5) =>
  size + (verticalScale(size) - size) * factor;

export const customFetchApi = async (path: string) => {
  try {
    const response = await fetch(`${BASE_URL}${path}`);
    return await response.json();
    // console.log(json);
    // return json;
  } catch (error) {
    console.log('error inside fetchGifs: ', error);
  }
};

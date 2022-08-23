import { Dimensions } from 'react-native';
import { BASE_URL } from './constants';

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
  const controller = new AbortController();
  let timeoutInstance;
  const signal = controller.signal;
  timeoutInstance = setTimeout(() => {
    controller.abort();
  }, 40000);
  try {
    const response = await fetch(`${BASE_URL}${path}`, { signal });
    // console.log('---------- response ---------', response);
    clearTimeout(timeoutInstance);
    return await response.json();
  } catch (error) {
    console.log('error inside customFetchApi: ', error?.name);
    if (error?.name === 'AbortError') {
      return {
        errorName: 'AbortError',
        errorMessage: 'connection timed out',
      };
    }
    return 'something went wrong';
  }
};

import AsyncStorage from '@react-native-async-storage/async-storage';
// import Purchases from 'react-native-purchases';
import {ENTITLEMENT_ID} from '../constants';
import {Appearance, Dimensions} from 'react-native';

// completed is a boolean.
export const setCompletedOnboardingAsyncStorage = async (
  completed,
  setCompletedOnboardingFlag,
  forceUpdateApp,
) => {
  await AsyncStorage.setItem('completedOnboarding', JSON.stringify(completed));
  setCompletedOnboardingFlag(completed);
  forceUpdateApp(); // added this to force a re-render
};

export const getCompletedOnboardingAsyncStorage = async () => {
  const value = await AsyncStorage.getItem('completedOnboarding');
  if (value === 'true') {
    return true;
  } else {
    return false;
  }
};

// Remove key-value pair from AsyncStorage.
export const removeItemValue = async key => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
};

// Fetch all items from AsyncStorage.
export const fetchAllItems = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);

    return items;
  } catch (error) {
    console.log(error, 'problemo');
  }
};

export const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({key: `blank-${numberOfElementsLastRow}`, empty: true});
    numberOfElementsLastRow = numberOfElementsLastRow + 1;
  }
  return data;
};

export function propsAreEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
}

export const unique = arr => [...new Set(arr)];

export const calculateOffset = (indexToCalculate, lengthOfList) => {
  const itemWidth = 80; // Change this to match your item width
  const itemsPerScreen = Math.floor(Dimensions.get('window').width / itemWidth);
  const screenCenter = Dimensions.get('window').width / 2;
  const startIndex = Math.max(
    0,
    indexToCalculate - Math.floor(itemsPerScreen / 2),
  );
  const endIndex = Math.min(lengthOfList - 1, startIndex + itemsPerScreen - 1);
  const totalWidth = (endIndex - startIndex + 1) * itemWidth;
  const offset = Math.max(
    0,
    startIndex * itemWidth - (screenCenter - totalWidth / 2) + itemWidth / 2,
  );
  return offset;
};

export const randomNumber = Math.floor(Math.random() * 10) + 1; // Or however you generate it

export const getRandomImage = () => {
  const randomNumber = Math.floor(Math.random() * 10) + 1; // Or however you generate it

  switch (randomNumber) {
    case 1:
      return require('../../assets/Background1.jpg');
    case 2:
      return require('../../assets/Background2.jpg');
    // ... and so on for all your images
    case 3:
      return require('../../assets/Background3.jpg');
    // ... and so on for all your images
    case 4:
      return require('../../assets/Background4.jpg');
    // ... and so on for all your images
    case 5:
      return require('../../assets/Background5.jpg');
    // ... and so on for all your images
    case 6:
      return require('../../assets/Background6.jpg');
    // ... and so on for all your images
    case 7:
      return require('../../assets/Background7.jpg');
    // ... and so on for all your images
    case 8:
      return require('../../assets/Background8.jpg');
    // ... and so on for all your images
    default:
      return require('../../assets/Background9.jpg');
    // ... and so on for all your images
  }
};

import React, {useCallback, useMemo, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import BottomSheetListItem from './BottomSheetListItem';
import BottomSheetListHeader from './BottomSheetListHeader';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import {useTheme} from '@react-navigation/native';

const BottomSheetList = ({
  data,
  onChange,
  sheetRef,
  snapPoints,
  title,
  index = -1,
  onClose,
  currentActiveIndex,
  multipleSelectionsAllowed = false,
  isBottomTabsSheet = false,
}) => {
  const {dark} = useTheme();
  const containerStyles = {
    borderColor: dark ? 'transparent' : '#C6C3C1',
    borderWidth: dark ? 0 : 0.5,
  };
  const backgroundStyles = {
    backgroundColor: dark ? '#202224' : '#FFFFFF',
  };
  const handleIndicatorStyle = {
    backgroundColor: '#A3A2A3',
    height: 4,
    width: 32,
    borderRadius: 10,
  };
  const onRenderListHeaderComponentHandler = () => (
    <BottomSheetListHeader title={title} />
  );
  const onKeyExtractHandler = ({id}) => id;
  const onBottomSheetItemRenderHandler = ({item}) => (
    <BottomSheetListItem
      data={item}
      onChange={onChange}
      currentActiveIndex={currentActiveIndex}
      multipleSelectionsAllowed={multipleSelectionsAllowed}
      isBottomTabsSheet={isBottomTabsSheet}
    />
  );

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={1}
        opacity={0.2}
      />
    ),
    [],
  );

  return (
    <BottomSheet
      style={[styles.container, containerStyles]}
      ref={sheetRef}
      snapPoints={snapPoints || [150]}
      backdropComponent={renderBackdrop}
      enablePanDownToClose
      backgroundStyle={backgroundStyles}
      onClose={onClose}
      handleIndicatorStyle={handleIndicatorStyle}
      index={index}>
      <BottomSheetFlatList
        data={data || []}
        ListHeaderComponent={onRenderListHeaderComponentHandler}
        renderItem={onBottomSheetItemRenderHandler}
        showsVerticalScrollIndicator={false}
        keyExtractor={onKeyExtractHandler}
      />
    </BottomSheet>
  );
};

export default BottomSheetList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 34,
    paddingLeft: 24,
    borderWidth: 0.5,

    borderRadius: 16,
    overflow: 'hidden',
  },
  separatorContainer: {
    width: '100%',
    height: 30,
  },
});

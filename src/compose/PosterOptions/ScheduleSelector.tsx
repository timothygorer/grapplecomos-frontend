import React, {useCallback, useEffect, useRef} from 'react';
import {View} from 'react-native';
import {observer, useLocalStore} from 'mobx-react';
import moment from 'moment-timezone';
import ThemedStyles from '../../styles/ThemedStyles';
import TopBar from '../TopBar';
import i18n from '../../common/services/i18n.service';
import NavigationService from '../../navigation/NavigationService';
import MText from '../../common/components/MText';
import {showNotification} from '../../AppMessages';
import DateTimePicker from '../../common/components/controls/DateTimePicker';
import {useComposeContext} from '../../compose/useComposeStore';
import MenuItemOption from '../../common/components/menus/MenuItemOption';
import {useBottomSheet} from '@gorhom/bottom-sheet';

/**
 * NSFW selector
 */
export default observer(function () {
  const theme = ThemedStyles.style;
  const store = useComposeContext();
  const dateTimePickerRef = useRef<any>(null); // todo: don't use any
  const localStore = useLocalStore(() => ({
    showPicker() {
      dateTimePickerRef.current.show();
    },
    onSelect(data?: Date) {
      // only assign if the date is gt than now
      console.log('selected date is ', data);
      if (data?.getTime && moment(data).diff(moment()) > 0) {
        console.log('reach0');
        store.setTimeCreated(data.getTime());
        console.log('set time to ', data.getTime());
      } else {
        showNotification(i18n.t('capture.scheduleError'), 'warning', 3000);
      }
    },
  }));

  const onNow = useCallback(() => {
    store.setTimeCreated(null);
  }, [store]);

  useEffect(() => {
    console.log('store is ', store);
  }, [store]);

  const current = moment(store.time_created);
  const bottomSheet = useBottomSheet();

  const closeSheet = useCallback(() => bottomSheet.close(), [bottomSheet]);

  return (
    <View style={[theme.flexContainer, theme.bgPrimaryBackground]}>
      <TopBar
        leftText="Completion Time"
        rightText={i18n.t('done')}
        onPressRight={closeSheet}
        onPressBack={closeSheet}
        backIconName="chevron-left"
        backIconSize="large"
        store={store}
      />
      <MText
        style={[
          theme.paddingVertical6x,
          theme.colorSecondaryText,
          theme.fontL,
          theme.paddingHorizontal3x,
        ]}>
        Please input completion time
      </MText>

      <MenuItemOption
        title={'Select Completion Time'}
        onPress={localStore.showPicker}
        label={
          store.time_created
            ? current.format('ddd MMM Do YYYY h.mma')
            : undefined
        }
        selected={Boolean(store.time_created)}
      />
      <DateTimePicker
        ref={dateTimePickerRef}
        date={current.toDate()}
        minimumDate={new Date()}
        onDateSelected={localStore.onSelect}
      />
    </View>
  );
});

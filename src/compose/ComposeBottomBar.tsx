import {useNavigation} from '@react-navigation/native';
// import { useIsFeatureOn, useIsIOSFeatureOn } from 'ExperimentsProvider';
import {observer} from 'mobx-react';
import React, {useCallback, useMemo} from 'react';
import {View, Keyboard} from 'react-native';
import {IconButton} from '../common/ui/icons';
import ThemedStyles from '../styles/ThemedStyles';

function ComposeBottomBar(props) {
  const theme = ThemedStyles.style;
  const navigation = useNavigation();
  const isCreateModalOn = true;
  const isIosMindsHidden = true;

  const allowMedia = !props.store.isEdit;

  const iconStyle = useMemo(
    () => [
      theme.padding3x,
      ThemedStyles.theme ? theme.colorWhite : theme.colorIcon,
    ],
    [theme.colorIcon, theme.colorWhite, theme.padding3x],
  );
  const onCameraPress = useCallback(() => {
    Keyboard.dismiss();
    navigation.navigate('Capture', {
      mode: props.store.allowedMode,
      onMediaConfirmed: media => {
        props.store.attachments.attachMedia(media, props.store.extra, true);
        return true;
      },
    });
  }, [navigation, props.store]);
  const onGalleryPress = useCallback(() => {
    console.log('zero.', props.store.allowedMode);
    props.store.selectFromGallery(props.store.allowedMode);
    console.log('one.');
  }, [props.store]);

  return (
    <View style={styles.bottomBar}>
      {allowMedia && (
        <IconButton
          name="image"
          style={iconStyle}
          onPress={onGalleryPress}
          testID="attachImage"
          scale
        />
      )}
      {allowMedia && (
        <IconButton
          name="camera"
          style={iconStyle}
          scale
          onPress={onCameraPress}
        />
      )}

      <View style={theme.flexContainer} />
      <IconButton
        name="cog"
        style={iconStyle}
        onPress={props.onOptions}
        testID="postOptions"
        scale
      />
    </View>
  );
}

export default observer(ComposeBottomBar);

const styles = ThemedStyles.create({
  bottomBar: [
    'bgPrimaryBackground',
    'paddingLeft2x',
    'padding',
    {
      flexDirection: 'row',
      height: 70,
      padding: 5,
      alignItems: 'center',
    },
  ],
});

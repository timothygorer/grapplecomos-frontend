import React, {PureComponent} from 'react';
import {Alert, Linking} from 'react-native';
import {BottomSheetModal as BottomSheetModalType} from '@gorhom/bottom-sheet';
import {
  WithSafeAreaInsetsProps,
  withSafeAreaInsets,
} from 'react-native-safe-area-context';
import Clipboard from '@react-native-clipboard/clipboard';
// import {Icon} from '@minds/ui';

import {IconButtonNext} from '../../common/ui/icons';
import {
  ANDROID_CHAT_APP,
  BLOCK_USER_ENABLED,
  BOOSTS_ENABLED,
  IS_IOS,
  MINDS_URI,
} from '../../config/Config';
import {isFollowing} from '../NewsfeedService';
// import shareService from '../../share/ShareService';
import i18n from '../../common/services/i18n.service';
import translationService from '../../common/services/translation.service';
import sessionService from '../../common/services/session.service';
import NavigationService from '../../navigation/NavigationService';
import type ActivityModel from '../ActivityModel';
import {showNotification} from '../../AppMessages';
import {
  BottomSheetButton,
  BottomSheetMenuItem,
  pushBottomSheet,
} from '../../common/components/bottom-sheet';
import {withChannelContext} from '../../channel/v2/ChannelContext';
import type UserModel from '../../channel/UserModel';
// import SendIntentAndroid from 'react-native-send-intent';
import logService from '../../common/services/log.service';
import {isApiError} from '../../common/services/ApiErrors';
// import {GroupContext} from '../../common/modules/groups/contexts/GroupContext';
import {copyToClipboardOptions} from '../../common/helpers/copyToClipboard';
import ThemedStyles from '../../styles/ThemedStyles';
import openUrlService from '../../common/services/open-url.service';
import PermissionsService from '../../common/services/permissions.service';

type PropsType = {
  entity: ActivityModel;
  onTranslate?: Function;
  testID?: string;
  navigation: any;
  channel?: UserModel;
  isChatHidden?: boolean;
  onVisibilityChange?: (visible: boolean) => void;
} & WithSafeAreaInsetsProps;

type StateType = {
  options: Array<any>;
  userBlocked: boolean;
};

/**
 * Activity Actions Component
 */
class ActivityActionSheet extends PureComponent<PropsType, StateType> {
  static contextType;
  static context;
  ref = React.createRef<BottomSheetModalType>();
  shareMenuRef = React.createRef<BottomSheetModalType>();
  deleteOption: React.ReactNode;
  state: StateType = {
    options: [],
    userBlocked: false,
  };

  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
  }

  /**
   * Show menu
   */
  showActionSheet = async () => {
    console.log('pressed menu.');
    // if (this.props.entity['is:following'] === undefined) {
    //   this.props.entity['is:following'] = await isFollowing(
    //     this.props.entity.guid,
    //   );
    // }

    this.setState({options: this.getOptions()}, () => {
      pushActionSheet({options: this.state.options});
    });
  };

  /**
   * Get the options array based on the permissions
   */
  getOptions() {
    const options: Array<{
      iconName?: string;
      iconType?: string;
      icon?: JSX.Element;
      title: string;
      testID?: string;
      onPress: () => Promise<void> | void;
    }> = [];

    // const entity = this.props.entity;

    // fixme tgorer need this to work for embedded urls:
    // const externalData = entity.getExternalData();
    // if (entity.canonical_url && externalData) {
    //   options.push({
    //     title: i18n.t('viewOnExternal', {external: externalData.source}),
    //     // icon: (
    //     //   <Icon
    //     //     size={24}
    //     //     name="captivePortal"
    //     //     color={ThemedStyles.getColor('Icon')}
    //     //   />
    //     // ),
    //     icon: null,
    //     onPress: () =>
    //       openUrlService.openLinkInInAppBrowser(entity.canonical_url),
    //   });
    // }

    options.push({
      title: i18n.t('edit'),
      iconName: 'edit',
      iconType: 'material',
      onPress: () => {
        console.log('navigation to compose...');
        this.props.navigation.navigate('Compose', {
          isEdit: true,
          entity: this.props.entity,
        });
      },
    });

    // Copy URL
    // options.push(
    //   copyToClipboardOptions(MINDS_URI + 'newsfeed/' + this.props.entity.guid),
    // );

    return options;
  }

  /**
   * Delete an entity
   */
  async deleteEntity() {
    try {
      await this.props.entity.deleteEntity();

      const state = NavigationService.getCurrentState();

      if (state && state.name === 'Activity') {
        this.props.navigation.goBack();
      }
    } catch (err) {
      if (isApiError(err)) {
        return this.showError(err?.message);
      }
      this.showError();
    }
  }

  /**
   * Send link to a user in chat
   */
  sendTo = async () => {
    try {
      const installed = true;
      // const installed =
      // await SendIntentAndroid.isAppInstalled(ANDROID_CHAT_APP);
      if (installed) {
        // SendIntentAndroid.sendText({
        //   title: '',
        //   text: MINDS_URI + 'newsfeed/' + this.props.entity.guid,
        //   type: SendIntentAndroid.TEXT_PLAIN,
        //   package: ANDROID_CHAT_APP,
        // });
      } else if (!this.props.isChatHidden) {
        Linking.openURL('market://details?id=com.minds.chat');
      }
    } catch (error) {
      logService.exception(error);
      console.log(error);
    }
  };

  /**
   * Show an error message
   */
  showError(message?: string) {
    showNotification(
      message || i18n.t('errorMessage') + '\n' + i18n.t('activity.tryAgain'),
      'danger',
      2000,
    );
  }

  /**
   * Share the link to the post
   */
  share = () => {
    // shareService.share(
    //   this.props.entity.text,
    //   MINDS_URI + 'newsfeed/' + this.props.entity.guid,
    // );
  };

  copyToClipboard = () => {
    Clipboard.setString(MINDS_URI + 'newsfeed/' + this.props.entity.guid);
    showNotification(i18n.t('copied'));
  };

  /**
   * Render Header
   */
  render() {
    return (
      <IconButtonNext
        scale
        name="more"
        size="large"
        onPress={this.showActionSheet}
        testID={this.props.testID}
      />
    );
  }
}

const pushActionSheet = ({options}: {options: any[]}) =>
  pushBottomSheet({
    safe: true,
    component: ref => {
      const onClosePress = async (onPress?: () => Promise<void>) => {
        // await ref.close();
        await onPress?.();
      };

      return (
        <>
          {options.map(({onPress, ...a}, i) => (
            <BottomSheetMenuItem
              {...{...a, onPress: () => onClosePress(onPress)}}
              key={i}
            />
          ))}
          <BottomSheetButton
            text={i18n.t('cancel')}
            onPress={() => ref.close()}
          />
        </>
      );
    },
  });

export const pushShareSheet = ({onSendTo, onShare}) =>
  pushBottomSheet({
    safe: true,
    component: ref => (
      <>
        <BottomSheetMenuItem
          onPress={async () => {
            await ref.close();
            onSendTo();
          }}
          title={i18n.t('sendTo')}
          iconName="repeat"
          iconType="material"
        />
        <BottomSheetMenuItem
          title={i18n.t('share')}
          onPress={async () => {
            await ref.close();
            onShare();
          }}
          iconName="edit"
          iconType="material"
        />

        <BottomSheetButton text={i18n.t('cancel')} onPress={ref.close} />
      </>
    ),
  });

export default withChannelContext(withSafeAreaInsets(ActivityActionSheet));

import React, {useEffect} from 'react';
import TopbarTabbar from '../common/components/topbar-tabbar/TopbarTabbar';
import type NewsfeedStore from './NewsfeedStore';
import i18n from '../common/services/i18n.service';
import {observer} from 'mobx-react';
// import { useIsFeatureOn } from 'ExperimentsProvider';
import {useLegacyStores} from '../common/hooks/use-stores';
import {NewsfeedType} from './NewsfeedStore';

function NewsfeedTabs({newsfeed}: {newsfeed: NewsfeedStore}) {
  const experimentOn = true;
  const {groups} = useLegacyStores();

  const tabs = React.useMemo(
    () => {
      const _tabs: {id: NewsfeedType; title: string}[] = [
        {id: 'discover', title:'Discover'},
      ];

      return _tabs;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [i18n.locale, experimentOn],
  );

  // useEffect(() => {
  //   if (!groups.loaded) {
  //     groups.loadList();
  //   }
  // }, [groups]);

  return newsfeed.feedType
    ?  <TopbarTabbar
        current={newsfeed.feedType}
        onChange={tabId => {
          newsfeed.changeFeedType(tabId);
        }}
        tabs={tabs}
      />
    : null;
}

export default observer(NewsfeedTabs);

import {action, observable, runInAction} from 'mobx';
import debounce from 'lodash/debounce';
import {storages} from '../../../common/services/storage/storages.service';

import FeedStore from '../../../common/stores/FeedStore';

export type DiscoveryV2SearchStoreAlgorithm =
  | 'top'
  | 'latest'
  | 'channels'
  | 'groups';

/**
 * Discovery Search Store
 */
export default class DiscoveryV2SearchStore {
  listStore = new FeedStore(true);

  @observable algorithm: DiscoveryV2SearchStoreAlgorithm = 'top';
  @observable query: string = '';
  @observable refreshing: boolean = false;
  @observable filter: string = 'all';
  @observable nsfw: Array<number> = [];
  refresh: any;

  params = {
    ['subtile.chapter.name']: `ilike.*${this.query}*`,
    limit: 5,
    apikey:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5ZXdsaHhxZmlxZ21idmVvaWdsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5Mjc1MTUwMiwiZXhwIjoyMDA4MzI3NTAyfQ.shLEsUUTGzBlVRQ6trp2lt0stOWpEm3k8_FOQY2oaMk',
  };

  constructor() {
    this.listStore.getMetadataService()?.setSource(`search/${this.algorithm}`);
    this.listStore
      .setLimit(12)
      .setInjectBoost(false)
      .setAsActivities(false)
      .setPaginated(true)
      .setParams(this.params);

    this.refresh = debounce(this._refresh, 300);
  }

  @action
  setQuery = (query: string, plus: boolean | undefined) => {
    this.listStore.setEndpoint(
      `https://lyewlhxqfiqgmbveoigl.supabase.co/rest/v1/tile?select=*,subtile(*,chapter(*))`,
    );
    this.query = query;
    this.params['subtile.chapter.name'] = `ilike.*${this.query}*`;
    console.log('refreshing...');
    this.refresh();
    console.log('finished refreshing...');
  };

  @action
  setAlgorithm = (algorithm: DiscoveryV2SearchStoreAlgorithm) => {
    this.listStore.getMetadataService()?.setSource(`search/${algorithm}`);
    this.algorithm = algorithm;
    this.refresh();
  };

  @action
  setFilter = (filter: string) => {
    this.filter = filter;
    this.refresh();
  };

  @action
  setNsfw = (nsfw: Array<number>) => {
    storages.user?.setArray('discovery-nsfw', nsfw);
    this.refresh();
  };

  @action
  async _refresh(): Promise<void> {
    this.refreshing = true;
    this.listStore.clear();
    console.log('refresh0');
    await this.listStore.setParams(this.params).refresh();
    console.log('refresh1');
    this.refreshing = false;
  }

  @action
  reset() {
    this.query = '';
    this.listStore.clear();
  }
}

import Vue from 'vue';
import {Watch, Component} from 'vue-property-decorator';
import {ITabConfig} from '@/interfaces/ITabConfig';

@Component
export class HasTabs extends Vue {
  // bind to <v-tabs v-model="currentTabIndex">
  public currentTabIndex = 0;

  // array of objects containing at minimum a slug and an async component.
  public tabs: ITabConfig[] = [];

  // allow customization of the query string key
  public tabQueryKey = 'tab';

  // @use <component :is="currentTabContentComponent" />
  get currentTabContentComponent() {
    if (!this.tabs.length || !this.tabs[this.currentTabIndex]) {
      return new Promise((resolve, reject) => reject());
    }
    return this.tabs[this.currentTabIndex].component;
  }

  get currentTabProps() {
    return this.tabs[this.currentTabIndex].props || {};
  }

  get currentTabEvents() {
    return this.tabs[this.currentTabIndex].events || {};
  }

  @Watch('$route.query', {immediate: true, deep: true})
  private onRouteQueryChange(value: Record<string, string | Array<string | null>>) {
    if (value && value[this.tabQueryKey]) {
      const currentTab = this.tabs.find((tab) => tab.slug === value[this.tabQueryKey]);
      if (currentTab !== undefined) {
        // if -1, we'll just go with the first tab.
        this.currentTabIndex = Math.max(0, this.tabs.indexOf(currentTab));
      } else {
        this.currentTabIndex = 0;
      }
    }
  }

  // Any time the tabs component updates the currentTabIndex, push the slug to a query param.
  @Watch('currentTabIndex')
  private onTabChange(value: number, oldValue: number) {
    if (this.$router) {
      const newQuery = {...this.$route.query, [this.tabQueryKey]: this.tabs[value].slug};
      this.$router.replace({query: newQuery});
    }
  }
}

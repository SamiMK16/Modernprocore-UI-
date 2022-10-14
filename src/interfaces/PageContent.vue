<template>
  <!-- Page header -->
  <v-layout column>
    <div class="white mb-4 elevation-3">
      <v-container class="pb-0">
        <v-layout row justify-space-between class="mb-3">
          <v-progress-linear
            :active="isLoading"
            height="5"
            color="orange"
            indeterminate
            class="ma-0 dis-page-content-loading-bar"
          />

          <!-- Page title -->
          <div class="display-1">
            <slot name="title" />
            {{ title }}
          </div>

          <!-- Page help and actions -->
          <v-layout shrink>
            <PageHelp v-bind="helpProp">
              <slot name="help" />
            </PageHelp>
            <PageActions :actions="actions" :icon="actionIcon" />
          </v-layout>
        </v-layout>

        <!-- Optional header content -->
        <div v-if="$slots.header" class="mb-4">
          <slot name="header" />
        </div>
      </v-container>

      <!-- Conditional tab navigation -->
      <div v-if="allTabs">
        <v-tabs v-model="currentTabIndex" grow show-arrows>
          <v-tabs-slider color="accent"></v-tabs-slider>
          <v-tab v-for="(tab, i) in allTabs" :key="`tab-${i}`" :ripple="false">
            {{ tab.label }}
          </v-tab>
        </v-tabs>
      </div>
    </div>

    <!-- Main content area -->
    <v-flex grow>
      <v-container>
        <!-- Default slot for generic content -->
        <slot v-if="$slots.default" />

        <!-- Conditional tab content -->
        <v-tabs-items v-if="allTabs">
          <v-tab-item :transition="false" :reverse-transition="false" lazy>
            <keep-alive>
              <component
                :is="currentTabContentComponent"
                v-bind="currentTabProps"
                v-on="currentTabEvents"
                @tabLoading="tabLoading = $event"
              />
            </keep-alive>
          </v-tab-item>
        </v-tabs-items>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue, Mixins } from 'vue-property-decorator';
import { IPageAction } from '@/interfaces/pages';
import { ITabConfig } from '@/interfaces/ITabConfig';
import { HasTabs } from '@/mixins/HasTabs';

import PageActions from '@/components/content/PageActions.vue';
import PageHelp from '@/components/content/PageHelp.vue';

import Theme from '@/config/theme';
import { THEMES } from '@/interfaces/theme';

@Component({
  components: {
    PageActions,
    PageHelp,
  },
})
export default class PageContent extends Mixins(HasTabs) {
  // Header title
  @Prop({ required: true })
  public title!: string;

  @Prop({ type: String, default: 'settings' })
  public actionIcon: string;

  // Incoming tabs
  @Prop({ default: () => [] })
  public tabConfig!: ITabConfig[] | [];

  // required for HasTabs mixin
  public tabs = this.tabConfig;

  // Default tab
  @Prop({
    default: 0,
  })
  private defaultTab!: number;

  @Prop()
  private actions!: IPageAction[];

  @Prop()
  private helpProp!: Record<string, string>;

  @Prop({ type: Boolean, default: false })
  private loading!: boolean;

  private tabLoading: boolean = false;

  get isLoading() {
    return this.loading || this.tabLoading;
  }

  // Use a computed version of tabs to
  // avoid mutating the prop
  get allTabs(): ITabConfig[] | false {
    if (this.tabs.length) {
      return [...this.tabs];
    }
    return false;
  }

  @Watch('tabConfig')
  private watchTabConfig(val: ITabConfig[]) {
    this.tabs = val;
  }
}
</script>

<style>
.dis-page-content-loading-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>

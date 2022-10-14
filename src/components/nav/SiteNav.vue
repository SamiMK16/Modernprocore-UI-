<template>
  <v-navigation-drawer
      id="navigation"
      v-model="_drawerModel"
      :absolute="!_isMobile"
      :class="{ 'force-grow': !_isMobile }"
      :mini-variant.sync="_mini"
      :stateless="!_isMobile"
      :temporary="_isMobile"
      :touchless="!_isMobile"
      app
      class="app-nav__drawer primary"
      dark
      @mouseover.native="hoverShow"
      @mouseleave.native="hoverHide"
  >
    <v-list id="navigationList" class=" app-nav__main">
      <!-- Minimize toggle non-mobile -->
      <template v-if="!_isMobile">
        <v-list-item v-if="mini || wasMini">
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on" @click.stop="expand">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </template>
            <span>{{ 'Expand' }}</span>
          </v-tooltip>
        </v-list-item>

        <v-layout v-else justify-end>
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on" @click.stop="collapse">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
            </template>
            <span>{{ 'Collapse' }}</span>
          </v-tooltip>
        </v-layout>
      </template>

      <!-- Close on mobile -->
      <template v-else>
        <v-list-item>
          <v-list-item-content/>
          <v-list-item-action>
            <v-btn icon @click.stop="toggleNavDrawer(false)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <template v-for="(nav, index) in navigationItems">
        <p v-if="nav.groupTitle" :key="`group-title-${index}`">{{ nav.groupTitle }}</p>
        <v-divider v-if="nav.divider" :key="`divider-${index}`"></v-divider>

        <v-list-group
            v-if="nav.items"
            :key="`nav-group-${index}`"
            :active-class="activeGroupClass"
            :group="nav.group"
            :prepend-icon="nav.icon"
            no-action
        >
          <template v-slot:activator>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold mx-auto">
                  {{ nav.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <template v-for="(item, itemIdx) in nav.items">
            <v-list-group
                v-if="item.items && !_mini"
                :key="`item-group-${itemIdx}`"
                :active-class="activeGroupClass"
                :group="item.group"
                no-action
                sub-group
            >
              <template v-slot:activator>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ item.title }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>

              <v-list-item
                  v-for="subItem in item.items"
                  :key="subItem.title"
                  :active-class="activeClass"
                  :class="
                  $route.name === (subItem.items ? subItem.items[0].to.name : subItem.to.name)
                    ? `${activeClassExact}`
                    : ''
                "
                  :to="subItem.items ? subItem.items[0].to : subItem.to"
              >
                <v-list-item-content>
                  <v-list-item-title
                      class="caption"
                  >
                    {{ subItem.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>

            <v-list-item
                v-else-if="!_mini"
                :key="`item-${itemIdx}`"
                :active-class="activeClass"
                :class="$route.name === item.to.name && activeClassExact"
                :to="item.to"
            >
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-group>

        <v-list-item
            v-else
            :key="`subItem-${index}`"
            :active-class="activeClass"
            :class="$route.name === nav.to.name && activeClassExact"
            :to="nav.to"
        >
          <v-list-item-action>
            <v-icon>{{ nav.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">{{ nav.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>

    <!-- App Version, always at the bottom -->
    <v-list>
      <v-list-item>
        <v-list-item-content class="caption">{{ 'App version ' + APP_VERSION }}</v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
import {version} from '@/../package.json';
import {mapGetters} from 'vuex';
import {NavigationItem, NAVIGATION_ITEMS} from './config';
import {cloneDeep} from 'lodash';
import {LICENSE_MODULES} from '@/interfaces/licenseSubscription';
import {CrudAction, APP_PERMISSIONS} from '@/interfaces/roles';

@Component({
  components: {},
  computed: {
    ...mapGetters('auth', [
      'userFeatureGated',
      'isAuthorizedUserAction',
    ]),
  },
})
export default class SiteNav extends Vue {

  private readonly userFeatureGated: string[];
  private readonly isAuthorizedUserAction: (moduleName: string, action: CrudAction) => boolean;
  private mini = false;
  private wasMini = false;
  private activeGroupClass = 'pro-ally-navgroup--active';
  private activeClass = 'pro-ally-navitem--active';
  private activeClassExact = 'pro-ally-navitem__exact--active';

  @Prop({default: true, required: true})
  private drawerModel!: boolean;

  @Prop({default: true, required: true})
  private isMobile!: boolean;

  @Prop({default: false})
  private defaultMini!: boolean;


  private get navigationItems() {
    return this.licensedNavigationItems(
        this.permissionNavigationItems(
            this.featureGatedNavigationItems(cloneDeep(NAVIGATION_ITEMS)),
        ),
    );
  }

  private get APP_VERSION() {
    return version.split('.').slice(0, 3).join('.');
  }

  private get _isMobile(): boolean {
    return this.isMobile;
  }

  private get _mini(): boolean {
    return this._isMobile ? false : this.mini;
  }

  private get _drawerModel(): boolean {
    return this.drawerModel;
  }

  private set _drawerModel(visible: boolean) {
    if (this._isMobile) {
      this.toggleNavDrawer(visible);
    }
  }

  private licensedNavigationItems(navigationItems: NavigationItem[]): NavigationItem[] {
    return navigationItems.filter((item) => {
      if (item.name === LICENSE_MODULES.ALLOW) {
        return true;
      }
      item.items = this.licensedNavigationItems(item.items);
      return item.items && item.items.length > 0;
    });
  }

  private featureGatedNavigationItems(navigationItems: NavigationItem[]): NavigationItem[] {
    return navigationItems.filter((item) => {
      if (!item.items) {
        return item.featureGate ? !this.userFeatureGated.includes(item.featureGate) : true;
      }
      item.items = this.featureGatedNavigationItems(item.items);
      return item.items && item.items.length > 0;
    });
  }

  private permissionNavigationItems(navigationItems: NavigationItem[]): NavigationItem[] {
    return navigationItems.filter((item) => {
      if (item.permission === APP_PERMISSIONS.ALLOW) {
        return true;
      }
      if (!item.items) {
        return item.permission ? this.isAuthorizedUserAction(item.permission, 'READ') : true;
      }
      item.items = this.permissionNavigationItems(item.items);
      return item.items && item.items.length > 0;
    });
  }

  @Watch('$vuetify.breakpoint.smAndDown', {immediate: true})
  private watchFilter(val: boolean) {
    this.mini = val;
    this.wasMini = val;
  }

  private async mounted() {
    if (this.defaultMini) {
      this.mini = true;
    }
  }

  private expand(): void {
    this.mini = false;
    this.wasMini = false;
  }

  private collapse(): void {
    this.mini = true;
    this.wasMini = true;
  }

  private hoverShow(): void {
    if (this.mini && !this._isMobile) {
      this.mini = false;
      this.wasMini = true;
    }
  }

  private hoverHide(): void {
    if (this.wasMini && !this._isMobile) {
      this.mini = true;
      this.wasMini = false;
    }
  }

  private toggleNavDrawer(visible: boolean) {
    this.$emit('toggleDrawer', visible);
  }
}
</script>

<style lang="scss" scoped>
.app-nav__drawer {
  flex-direction: column;
}

/* Grow main nav so version & © stays at the bottom */
.pro-ally-nav__main {
  flex: 1;
}

/* Persist divider when 'mini' */
.divider--persistent {
  display: block !important;
}

/* Active nav item */
> > > .pro-ally-navitem--active {
  color: inherit;
}

> > > .pro-ally-navitem__exact--active {
  border-left: 3px solid rgba(255, 255, 255, 0.4);
  color: rgba(255, 255, 255, 0.7);
}

.force-grow {
  max-height: none !important;
  height: auto !important;
  min-height: 100%;
}

body {
  background-color: #F5F5F5;
}

::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
</style>

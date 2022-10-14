<template>
  <v-app>

    <!-- Header bar -->
   <v-app-bar height="60px" v-if="isMobile">
     <v-btn v-if="isMobile" icon @click.stop="toggleNavDrawer">
       <v-app-bar-nav-icon></v-app-bar-nav-icon>
     </v-btn>

   </v-app-bar>

    <!-- Two column main layout -->
    <v-layout>

      <!-- Global site nav -->
      <SiteNav :defaultMini="defaultMini" :drawerModel="_navDrawer" :isMobile="isMobile"
               @toggleDrawer="toggleNavDrawer"/>

      <!-- Main content wrappers -->
      <v-main class="grey lighten-4">
        <div class="fill-height" fluid style="padding:0; margin-bottom: 600px;">

          <!-- Router view content slot -->
          <slot/>
        </div>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

import AccountNav from '@/components/nav/AccountNav.vue';
import AppLogo from '@/components/nav/AppLogo.vue';
import SiteNav from '@/components/nav/SiteNav.vue';

@Component({
  components: {
    AccountNav,
    AppLogo,
    SiteNav,
  },
})
export default class DefaultLayout extends Vue {
  private navDrawer = false;

  private get defaultMini(): boolean {
    const {smAndUp, mdAndDown} = this.$vuetify.breakpoint;
    return smAndUp && mdAndDown;
  }

  private get isMobile(): boolean {
    return this.$vuetify.breakpoint.xsOnly;
  }

  private get _navDrawer(): boolean {
    if (this.$vuetify.breakpoint.smAndUp) {
      return true;
    }
    return this.navDrawer;
  }

  private toggleNavDrawer(visible: boolean): void {
    this.navDrawer = visible;
  }

}
</script>

<style scoped>
.header__logo-link {
  display: flex;
}

</style>



<template>
  <v-layout align-center fill-height justify-center row class="secondary">
    <transition name="fade-transition">
      <div v-if="bgReady" class="pro-ally-auth__bg"/>
    </transition>

    <transition name="slide-y-reverse-transition">
      <div v-if="ready" class="pro-ally-auth__wrap my-4">
        <div class="pro-ally-auth__brand text-center">
          <AppLogo
              :vertical="true"
              color="#ffffff"
              dark
              width="140"
          />
        </div>

        <v-card class="mt-4" elevation="8">
          <v-card-title class="">
            <router-view/>
          </v-card-title>
        </v-card>

        <div class="mt-4 text-xs-center">
          <v-btn text small to="#privacy">{{
              'Privacy Policy'
            }}
          </v-btn>
          <v-btn text small to="#terms">{{
              'Term of use'
            }}
          </v-btn>
        </div>
      </div>
    </transition>
  </v-layout>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

import AppLogo from '@/components/nav/AppLogo.vue';

@Component({
  components: {
    AppLogo,
  },
})
export default class AuthLayout extends Vue {
  private ready = false;
  private bgReady = false;

  private mounted() {
    setTimeout(() => (this.ready = true), 500);
    this.bgReady = true;
  }

}
</script>

<style scoped>
.pro-ally-auth__bg {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}

.pro-ally-auth__wrap {
  width: 460px;
  max-width: 90%;
  position: relative;
}

/* Text links */
>>> a:not(.v-btn) {
  text-decoration: underline;
}

>>> a:not(.v-btn):hover {
  text-decoration: none;
}
</style>

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

        <v-card class="mt-4 pa-6" elevation="8">
          <v-card-title>Access Denied</v-card-title>
          <v-card-subtitle>Contact Admin Support</v-card-subtitle>
          <v-card-text>you don't have permissions for inputted link</v-card-text>
            <v-btn plain dark @click="$router.back()" class="primary" rounded>Back</v-btn>
            <v-btn dark :to="{name:'auth.logout'}" class="primary float-right" plain rounded>Logout</v-btn>
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
export default class AccessDenied extends Vue {
  private ready = false;
  private bgReady = false;

  private mounted() {
    setTimeout(() => (this.ready = true), 500);
    this.bgReady = true;
  }
}
</script>

<style scoped>

</style>

<template>
  <v-snackbar
      v-model="config.active"
      :class="config.color"
      :timeout="config.timeout"
      shapped
      class="application"
      @click="dismiss"
  >
    <v-icon v-if="config.icon" dark left>{{ config.icon }}</v-icon>
    {{ config.text }}
  </v-snackbar>
</template>

<script lang="ts">

import {Component, Vue} from 'vue-property-decorator';
import {IToastOptions} from './index';

@Component
export default class DisToast extends Vue {
  private config: IToastOptions = {
    active: false,
    text: '',
    icon: '',
    color: 'info',
    timeout: 6000,
    dismissible: true,
  };

  private show(options: IToastOptions = {}) {
    if (this.config.active) {
      this.close();
      this.$nextTick(() => this.show(options));
      return;
    }

    Object.keys(options).forEach(
        (field: string) => (this.config[field] = options[field]),
    );

    this.config.active = true;
  }

  private close() {
    this.config.active = false;
  }

  private dismiss() {
    if (this.config.dismissible) {
      this.config.active = false;
    }
  }
}
</script>

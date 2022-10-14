<template>
  <v-app>
    <component :is="layoutComponent">
      <router-view/>
    </component>
  </v-app>
</template>

<script lang="ts">

import {Component, Vue} from 'vue-property-decorator';

@Component({})
export default class App extends Vue {
  private get layoutComponent(): string {
    const layouts: any[] = [];
    this.$route.matched.reduce((accumulator, currentValue) => {
      if (currentValue.meta.layout) {
        accumulator.push(currentValue.meta.layout);
      }
      return accumulator;
    }, layouts);
   if (layouts.length >= 1) {
      return layouts.pop();
    }
    return this.closestRouteMeta(this.$route, 'layout') || 'app-layout-default';
  }
  private closestRouteMeta(route: any, key: string) {
    const metaValues: any[] = [];
    route.matched.reduce((accumulator: any[], currentValue: any) => {
      if (currentValue.meta[key]) {
        accumulator.push(currentValue.meta[key]);
      }
      return accumulator;
    }, metaValues);
 if (metaValues.length >= 1) {
      return metaValues.pop();
    }

    return null;
  }
}
</script>

<style>
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 5px 0 5px rgba(255, 255, 255, 0);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #027f84;
  border-radius: 5px;
}
</style>

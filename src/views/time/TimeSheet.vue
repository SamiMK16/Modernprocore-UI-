<template>
  <app-page :loading="loading" :title="'Time Sheet'">
    <template v-slot:header>
      <v-btn outlined primary> Add New</v-btn>
    </template>
  </app-page>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({})
export default class Home extends Vue {
  private loading = false;
}
</script>

<style scoped>

</style>

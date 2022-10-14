<template>
  <app-page :loading="loading" :title="'Tags'">
    <template v-slot:header>
      <v-btn outlined primary> Add New</v-btn>
    </template>
  </app-page>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({})
export default class Tags extends Vue {
  private loading = false;
}
</script>

<template>
  <v-data-table
      :headers="headers"
      :hide-default-footer="hideDefaultFooter"
      :hide-default-header="hideHeaders"
      :items="items"
      :loading="loading"
      :multi-sort="multiSort"
      :search="search"
      :show-select="showSelect"
      :sort-by="sortBy"
      :sort-desc="sortDescending"
      class="elevation-1"
      item-key="name"
  >
    <template v-slot:no-data>
      <p v-if="loading">Loading Data ...</p>
      <p v-else>No Data</p>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({})
export default class DataTable extends Vue {
  @Prop({type: Boolean, default: false})
  private loading: boolean;
  @Prop({type: Array, required: false})
  private headers: any;
  @Prop({type: Array, required: true})
  private items!: any;
  @Prop({type: String, default: '', required: false})
  private search: string;
  @Prop({type: Boolean, default: false, required: false})
  private hideHeaders: boolean;
  @Prop({type: Boolean, default: false, required: false})
  private showSelect: boolean;
  @Prop({type: Array, default: null, required: false})
  private sortBy: string[];
  @Prop({type: Boolean, default: false, required: false})
  private multiSort: boolean;
  @Prop({type: Boolean, default: false, required: false})
  private sortDescending: boolean;
  @Prop({type: Boolean, default: false, required: false})
  private hideDefaultFooter: boolean;

}
</script>

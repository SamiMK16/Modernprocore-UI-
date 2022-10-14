<template>
  <app-page :loading="loading" :title="'Calender'">
    <template v-slot:header>
      <v-col cols="auto">
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn outlined primary
            v-bind="attrs"
            v-on="on"
          >Add New</v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card class="xs:hidden sm:hidden">
            <v-toolbar
              color="primary"
              dark
            >Opening from the bottom</v-toolbar>
            <v-card-text>
              <div class="text-h2 pa-12">Hello world!</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
    </template>
  </app-page>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({})
export default class Calender extends Vue {
  private loading = false;
}
</script>

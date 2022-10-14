<template>
  <v-dialog
      v-if="$slots.default"
      v-model="dialog"
      lazy
      max-width="560"
      persistent
  >
    <!-- Trigger button -->
    <template slot="activator">
      <v-btn icon>
        <v-icon color="grey">{{ icon }}</v-icon>
      </v-btn>
    </template>

    <!-- Modal content -->
    <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>

      <v-card-text>
        <slot/>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="dialog = false">{{ action }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class PageHelp extends Vue {
  @Prop({type: String, default: () => 'Got it'})
  private action: string;

  @Prop({type: String, default: () => 'Help'})
  private title: string;

  @Prop({default: 'help_outline'})
  private icon: string;

  private dialog = false;
}
</script>

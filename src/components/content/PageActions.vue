<template>
  <v-menu v-if="actions" v-model="menu" :close-on-content-click="true">
    <!-- Trigger -->
    <template v-slot:activator="{ on }">
      <v-btn :disabled="actions.length === 0" icon v-on="on">
        <v-icon color="grey">{{ icon }}</v-icon>
      </v-btn>
    </template>

    <!-- Action List -->
    <v-list class="py-0">
      <v-list-item
          v-for="(action, i) in actions"
          :key="i"
          v-dis-permission:[permissions(action)].tile="
          action.permission ? action.permission.moduleName : 'ALLOW'
        "
          active-class=""
          @click="handleClick(action)"
      >
        <v-list-item-action v-if="action.icon">
          <v-icon>{{ action.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ action.label }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {IPageAction} from '@/interfaces/pages.ts';

@Component
export default class PageActions extends Vue {
  private menu = false;

  @Prop({default: 'settings'})
  private icon: string;
  @Prop({
    default: false,
  })
  private actions!: IPageAction[] | boolean;

  private permissions(item: any) {
    return item.permission ? item.permission.action : 'READ';
  }

  private handleClick(action: IPageAction): void {
    action.onClick();
  }
}
</script>

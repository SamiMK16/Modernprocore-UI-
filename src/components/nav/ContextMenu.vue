<template>
  <v-menu
      :nudge-left="width"
      :nudge-width="width"
      origin="center center"
      transition="scale-transition"
      v-bind="additionalProps"
  >
    <template v-slot:activator="{ on }">
      <slot name="activator" v-bind="{ on }">
        <v-btn :disabled="additionalProps.disabled" icon v-on="on">
          <v-icon>{{ icon }}</v-icon>
        </v-btn>
      </slot>
    </template>

    <v-list :class="containerClass">
      <v-list-item v-if="title">
        <v-subheader class="subheading menu-title">{{ title }}</v-subheader>
      </v-list-item>
      <v-list-item
          v-for="(menuItem, i) in items"
          :key="`context-menu-${i}`"
          v-dis-permission:[permissions(menuItem)].item="
          menuItem.permission ? menuItem.permission.moduleName : 'ALLOW'
        "
          avatar
          @click="menuItem.onClick(item)"
      >
        <v-list-item-avatar v-if="menuItem.image || menuItem.icon" :item="!!menuItem.image">
          <v-icon v-if="menuItem.icon" color="#000000" v-bind:style="menuItem.iconStyle">{{
              menuItem.icon
            }}
          </v-icon>
          <v-img v-else-if="menuItem.image" :src="menuItem.image" v-bind="menuItem.avatarProps"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>{{ menuItem.text }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {CrudAction} from '@/interfaces/roles';

export interface IContextMenuItem {
  text: string;
  icon?: string;
  iconStyle?: any;
  image?: string;
  permission?: { moduleName: string; action: CrudAction };
  onClick: (item?: any) => void;
  avatarProps?: Record<string, any>;
}

@Component
export default class ContextMenu extends Vue {
  @Prop({default: ''})
  private title: string;

  @Prop()
  private item: any;

  @Prop()
  private items: IContextMenuItem[];

  @Prop({default: 'more_horiz'})
  private icon: string;

  @Prop({default: 280})
  private width: number;

  private containerClass: string;

  private get additionalProps() {
    const {title, item, items, icon, width, containerClass = 'py-4', ...additionalProps} = this.$attrs;
    this.containerClass = containerClass;
    return additionalProps;
  }

  private permissions(item: any) {
    return item.permission ? item.permission.action : 'READ';
  }
}
</script>

<style scoped>
.menu-title {
  text-transform: uppercase;
  font-size: 1.5rem;
}
</style>

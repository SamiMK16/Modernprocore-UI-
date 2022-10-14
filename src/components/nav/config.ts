import { LICENSE_MODULES } from '@/interfaces/licenseSubscription';
import { APP_PERMISSIONS } from '@/interfaces/roles';
import { Location } from 'vue-router';

export interface NavigationItemCommon {
  icon?: string;
  to?: Location;
  groupTitle?: string;
  group?: string;
  items?: NavigationItem[];
}

interface NavigationItemNonDivider extends NavigationItemCommon {
  divider?: boolean;
  name: LICENSE_MODULES;
  permission?: APP_PERMISSIONS;
  title: string;
}

export type NavigationItem = NavigationItemNonDivider;

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    icon: 'mdi-clock-outline',
    divider: true,
    name: LICENSE_MODULES.ALLOW,
    title: 'Time Tracker',
    to: { name: 'time.tracker' },
  },

  {
    icon: 'mdi-calendar',
    divider: true,
    name: LICENSE_MODULES.ALLOW,
    title: 'Projects',
    to: {name: 'manage.projects'},
  }, 
  // {
  //   icon: 'mdi-view-dashboard',
  //   divider: true,
  //   name: LICENSE_MODULES.ALLOW,
  //   title: 'Dashboard',
  //   to: {name: 'analyze.home'},
  // }, 
  {
    icon: 'mdi-receipt-text-check-outline',
    divider: true,
    name: LICENSE_MODULES.ALLOW,
    title: 'Client',
    to: {name: 'client'},
  },
  {
    icon: 'mdi-clipboard-account-outline',
    divider: true,
    name: LICENSE_MODULES.ALLOW,
    title: 'Team',
    to: { name: 'manage.team' },
  },

  // {
  //   icon: 'mdi-tag',
  //   divider: true,
  //   name: LICENSE_MODULES.ALLOW,
  //   title: 'Tags',
  //   to: {name: 'manage.tags'},
  // },
  {
    icon: 'mdi-clipboard-account-outline',
    divider: true,
    name: LICENSE_MODULES.ALLOW,
    title: 'Invoice',
    to: { name: 'Invoice' },

  },
  {
    icon: 'mdi-calendar-clock-outline',
    divider: true,
    name: LICENSE_MODULES.ALLOW,
    title: 'Settings',
    to: { name: 'Settings' },

  },
  {
    icon: 'mdi-logout',
    divider: true,
    name: LICENSE_MODULES.ALLOW,
    title: 'Logout',
    to: {name: 'auth.logout'},
  },
];

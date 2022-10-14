import TimeTracker from '@/views/time/TimeTracker.vue';
import TimeSheet from '@/views/time/TimeSheet.vue';
import Settings from '@/views/profile/settings.vue'
import {RouteConfig} from 'vue-router';
// import {LICENSE_MODULES} from '@/interfaces/licenseSubscription.ts';
// import {APP_PERMISSIONS} from '@/interfaces/roles';

const routes: RouteConfig[] = [
  {
    path: '/',
    redirect: '/profile',
  },
  {
    path: '/profile',
    component: Settings,
    name: 'Settings',
    // meta: {
    //   LICENSE: LICENSE_MODULES.ALLOW,
    //   PERMISSION: {
    //     name: 'ALLOW',
    //     action: 'READ',
    //   },
    // },
  }
];

export default routes;

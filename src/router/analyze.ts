import {RouteConfig} from 'vue-router';
import {LICENSE_MODULES} from '@/interfaces/licenseSubscription.ts';
import Client from '@/views/client/Client.vue';
import {APP_PERMISSIONS} from "@/interfaces/roles";

const routes: RouteConfig[] = [
  {
    path: '/client',
    component: Client,
    name: 'client',
    meta: {
      LICENSE: LICENSE_MODULES.ALLOW,
      PERMISSION: {
        name: APP_PERMISSIONS.CLIENT,
        action: 'READ',
      },
    },
  }
];

export default routes;

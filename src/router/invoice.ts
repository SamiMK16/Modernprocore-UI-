import Invoice from '@/views/invoices/invoice.vue'
import {RouteConfig} from 'vue-router';
import {LICENSE_MODULES} from "@/interfaces/licenseSubscription";
import {APP_PERMISSIONS} from "@/interfaces/roles";
// import {APP_PERMISSIONS} from '@/interfaces/roles';

const routes: RouteConfig[] = [
    {
        path: "/",
        redirect: "/time-tracker"
    },
    {
        path: '/invoice',
        component: Invoice,
        name: 'Invoice',
        meta: {
          LICENSE: LICENSE_MODULES.ALLOW,
          PERMISSION: {
            name: APP_PERMISSIONS.INVOICES,
            action: 'READ',
          },
        },
    }
];

export default routes;

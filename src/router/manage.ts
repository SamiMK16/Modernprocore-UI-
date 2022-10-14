import {RouteConfig} from 'vue-router';
import {LICENSE_MODULES} from '@/interfaces/licenseSubscription.ts';
import Projects from '@/views/manage/Projects.vue';
import Tags from '@/views/manage/Tags.vue';
import Team from '@/views/manage/Team.vue';
import {APP_PERMISSIONS} from "@/interfaces/roles";
// import {APP_PERMISSIONS} from '@/interfaces/roles';

const routes: RouteConfig[] = [
  {
    path: '/manage-projects',
    component: Projects,
    name: 'manage.projects',
    meta: {
      LICENSE: LICENSE_MODULES.ALLOW,
      PERMISSION: {
        name: APP_PERMISSIONS.PROJECT,
        action: 'READ',
      },
    },
  }, {
    path: '/manage-tags',
    name: 'manage.tags',
    component: Tags,
    meta: {
      LICENSE: LICENSE_MODULES.ALLOW,
      PERMISSION: {
        name: 'ALLOW',
        action: 'READ',
      },
    },
  }, {
    path: '/manage-team',
    component: Team,
    name: 'manage.team',
    meta: {
      LICENSE: LICENSE_MODULES.ALLOW,
      PERMISSION: {
        name: "ALLOW",
        action: 'READ',
      },
    },
  },
];

export default routes;

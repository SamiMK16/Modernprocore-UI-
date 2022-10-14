import Vue from 'vue';

import DefaultLayout from '@//layouts/DefaultLayout.vue';
import AuthLayout from '@//layouts/AuthLayout.vue';
import NotFoundLayout from '@//layouts/NotFoundLayout.vue';
import AccessDenied from '@//layouts/AccessDenied.vue';
import PageContent from '@/components/content/PageContent.vue';
import AppDataTable from '@/components/data/DataTable.vue';

Vue.component('app-layout-404', NotFoundLayout);
Vue.component('app-layout-auth', AuthLayout);
Vue.component('app-layout-default', DefaultLayout);
Vue.component('app-layout-access-denied', AccessDenied);
Vue.component('app-page', PageContent);
Vue.component('app-data-table', AppDataTable);

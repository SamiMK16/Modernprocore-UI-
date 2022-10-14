import AuthIndex from '@/views/auth/Index.vue';
import {RouteConfig} from 'vue-router';
import Login from '@/views/auth/LoginView.vue';
import ResetPassword from '@/views/auth/ResetPasswordView.vue';
import Signup from '@/views/auth/SignupView.vue';
import LogoutView from '@/views/auth/LogoutView.vue';

const routes: RouteConfig[] = [
  {
    path: '/auth',
    name: 'auth',
    meta: {layout: 'app-layout-auth', guest: true},
    component: AuthIndex,
    redirect: 'auth/login',
    children: [
      {
        path: 'login',
        name: 'auth.login',
        meta: {layout: 'app-layout-auth', guest: true},
        component: Login,
      },
      {
        path: 'logout',
        name: 'auth.logout',
        meta: {layout: 'app-layout-auth', guest: false},
        component:LogoutView
      },
      {
        path: 'sign-up',
        name: 'auth.signup',
        meta: {layout: 'app-layout-auth', guest: true},
        component: Signup,
      },
      {
        path: 'forgot',
        name: 'auth.forgot',
        meta: {layout: 'app-layout-auth', guest: true},
        component: ResetPassword,
      },
    ],
  },
];

export default routes;

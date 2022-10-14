import Vue from 'vue';
import Router, {RouteConfig} from 'vue-router';

// Get all available routes.
import AuthRoutes from './auth';
import AnalyzeRoutes from './analyze';
import ManageRoutes from './manage';
import TimeRoutes from './time';
import ProfileRoutes from './profile';
import AccessDenied from './access-denied';
import InvoiceRoutes from './invoice';
import NotFoundRoutes from './not-found';

import store from '@/store';
import {
  getFromRoutePath,
  validateFeatureGate,
  validateLicense,
  validatePermission
} from '@/services/api/license-service';
import AuthStorage from '@/services/auth-storage';
// Instantiate the router.
Vue.use(Router);

// Combine Routes
let allRoutes: RouteConfig[] = [];
allRoutes = allRoutes.concat(
  // AccountRoutes,
  AuthRoutes,
  AnalyzeRoutes,
  ManageRoutes,
  InvoiceRoutes,
  TimeRoutes,
  ProfileRoutes,
  // SchedulingRoutes,
  AccessDenied,
  NotFoundRoutes,
  // CustomersRoutes,
  // CustomerSignUpRoutes,
  // ApiConfigurationRoutes,
  // UsersRoutes,
  // AppointmentsRoutes,
  // RevenuesRoutes,
  // categoryRoutes,
  // ClientsRoutes,
  // locationRoute,
  // PermissionRoutes,
  // rolesRoutes,
  // reviewRoutes,
  // CustomerFamily,
);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: allRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {x: 0, y: 0};
    }
  },
});


router.beforeEach(async (to, from, next) => {
  to.meta!.referer = from;

  const guest = !!to.meta!.guest;
  const hasToken = store.getters['auth/token'];
  const storedToken = AuthStorage.getToken();
  if (storedToken !== null) {
    return next();
  }
  if (guest && hasToken) {
    return next({name: 'home'});
  }

  // Unguarded routes for auth.
  if (guest) {
    return next();
  }

  // If there is a JWT check if it's valid. auth/validate checks current user
  // and sets store data or kicks them out if invalid.
  if (hasToken) {
    const validUser =
      await store.dispatch('auth/validate');
    if (validUser) {
      const hasValidLicense = await validateLicense(to);
      if (!hasValidLicense) {
        return next({name: 'access-denied', query: {redirect: getFromRoutePath(from), error: 'license'}});
      }
      const hasPermission = await validatePermission(to);
      if (!hasPermission) {
        return next({
          name: 'access-denied',
          query: {redirect: getFromRoutePath(from), error: 'permission'},
        });
      }
    }
    if (!validateFeatureGate(to)) {
      return next({name: 'not-found', params: {0: to.path}});
    }
    return next();
  }

  redirectToLogin();

  function redirectToLogin() {
    // Redirect the user to the last attempted page if it wasn't auth/~ish
    const returnPath = to.fullPath.indexOf('auth/') === 1 ? null : to.fullPath;
    next({name: 'auth.login', query: {next: returnPath}});
  }
});
export default router;

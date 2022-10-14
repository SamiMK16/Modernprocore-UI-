// import Vue from 'vue';
import store from '@/store';
import {Route} from 'vue-router';
// import {LICENSE_MODULES} from '@/interfaces/licenseSubscription';
import {APP_PERMISSIONS, CrudAction} from '@/interfaces/roles';

export async function validateLicense(toRoute: Route) {
    return true;
    // const licensedModules: string[] = store.getters['preference/licensedModules'];
    // return !toRoute.meta?.LICENSE ||
    //     toRoute.meta.LICENSE === LICENSE_MODULES.ALLOW ||
    //     licensedModules.includes(toRoute.meta.LICENSE);

}

export async function validatePermission(toRoute: Route) {
    const isAuthorizedUserAction: (
        moduleName: string,
        action: CrudAction,
    ) => boolean = store.getters['auth/isAuthorizedUserAction'];
    return !toRoute.meta?.PERMISSION ||
        toRoute.meta.PERMISSION.action === APP_PERMISSIONS.ALLOW ||
        isAuthorizedUserAction(
            toRoute.meta.PERMISSION.name,
            toRoute.meta.PERMISSION.action,
        );

}

export function getFromRoutePath(fromRoute: Route) {
    return fromRoute.fullPath.indexOf('auth/') === 1 ? '/' : fromRoute.fullPath;
}

export function validateFeatureGate(toRoute: Route) {
    const userFeatureGated: string[] = store.getters['auth/userFeatureGated'];
    return true;
}

import { Store, Module } from 'vuex';

/**
 * Check if store has a specified module.
 *
 * @param store vuex store to check.
 * @param moduleName module to check if registered.
 */
export function storeHasModule(store: any, moduleName: string | string[]) {
  if (!store || !store.state) {
    return false;
  }

  if (typeof moduleName === 'string') {
    return store.state[moduleName];
  } else if (Array.isArray(moduleName)) {
    try {
      let currentModule = store.state;
      moduleName.forEach((submodule: any) => {
        currentModule = currentModule[submodule];
      });
      return currentModule;
    } catch (error) {
      return false;
    }
  } else {
    // throw new TypeError('moduleName must be of type "string" or "array"');
    return false;
  }
}

/**
 * Register store module on provided vuex store with no check.
 *
 * @param store vuex Store to register on (this.$store).
 * @param moduleName string name of module to register
 * @param storeModule module class to register.
 */
export function registerStoreModule(store: any, moduleName: string | string[], storeModule: any): void {
  store.registerModule(moduleName, storeModule);
}

/**
 * Conditionally register store module if it's not already registered.
 *
 * @param store vuex Store to register on (this.$store).
 * @param moduleName string name of module to register
 * @param storeModule module class to register.
 * @param registeredAction
 */
export default function lazyLoadStoreModule(
  store: Store<any>,
  moduleName: string | string[],
  storeModule: Module<any, any>,
  registeredAction = 'moduleRegistered',
): void {
  if (!storeHasModule(store, moduleName)) {
    registerStoreModule(store, moduleName, storeModule);

    if (storeModule.actions && registeredAction in storeModule.actions) {
      store.dispatch(`${moduleName}/${registeredAction}`).then(r =>r);
     }
  }
}

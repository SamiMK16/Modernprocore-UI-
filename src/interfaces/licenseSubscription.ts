export enum LICENSE_MODULES {
  ALLOW = 'ALLOW',

}

export enum LICENSE_PACKAGES {
  APP_BASE_LICENSE = 'APP_BASE_LICENSE',
}

export interface LicenseSubscription {
  licensePackageModels: LicensePackageModel[];
  moduleLicenseModels: ModuleLicenseModel[];
}

export interface LicensePackageModel {
  webId: number;
  description: string;
  type: LICENSE_PACKAGES;
  moduleLicenseModels: ModuleLicenseModel[];
}

export interface ModuleLicenseModel {
  webId: number;
  module: string;
  active: boolean;
}

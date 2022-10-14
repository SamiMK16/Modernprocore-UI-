// Allowed strings
export type CrudAction = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';
export type RoleUse = 'STAFF' | 'CUSTOMER' | 'ALL' | null;

// A role
export interface IRole {
  webId: number;
  roleCode?: string;
  title: string;
  description: string;
  externalKey: string;
  editable?: boolean;
  permissions?: IPermission[];
  use?: RoleUse | string;
  active: boolean;
  role?: boolean;
  roleId?: number;
  branch: number;
}

// Fields for adding or editing a role
export interface IRoleFields {
  roleCode?: string;
  title: string;
  description: string;
  use: RoleUse;
}

// A permission
export interface IPermission {
  webId: number | string;
  code: string;
  title: string;
  description: string;
  type: CrudAction | null;
  invalid?: boolean;
  use: RoleUse | string;
  active?: boolean;
  branch: number;
  appPermission?: string;
}

// Group of permissions
export interface IPermissionGroup {
  groupCode: string;
  title: string;
  permissions: IPermission[];
  childPermissions: IPermissionGroup[];
}

export interface ITypeMappedPermissionGroup {
  groupCode: string;
  title: string;
  permissions: { [key in CrudAction]?: IPermission };
}

export enum APP_PERMISSIONS {
  ALLOW = 'ALLOW',
  CLIENT = 'CLIENT',
  TRACKER = 'TRACKER',
  SHEET = 'SHEET',
  USER = 'USER',
  PROFILE = 'PROFILE',
  INVOICES = 'INVOICES',
  PROJECT = 'PROJECT',
}

export interface IRolePermission {
  webId: number | null;
  clientId: number;
  role: number;
  roleTitle: string;
  permissionTitle: string;
  permissionCode: string;
  permissionUse: string;
  roleUse: string;
  externalKey: string;
  notRolePermission: boolean;
  permission: number;
}

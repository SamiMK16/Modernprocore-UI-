import { CrudAction } from './roles';

// Page actions menu
export interface IPageAction {
  label: string;
  icon?: string;
  onClick: (...args: any[]) => any;
  permission?: { moduleName: string, action: CrudAction };
}

export interface PageModel<T> {
  content: T[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort[];
  first: boolean;
  numberOfElements: number;
}

export interface Sort {
  direction: string;
  property: string;
  ignoreCase: boolean;
  nullHandling: string;
  ascending: boolean;
}

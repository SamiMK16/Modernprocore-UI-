export interface ITabConfig {
  slug: string;
  component: any;
  props?: any;
  events?: { [key: string]: (...args: any) => void };
  [x: string]: any;
}

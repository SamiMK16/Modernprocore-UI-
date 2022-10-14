/**
 * Borrowed, modified, and typescript adapted
 *
 * @see https://github.com/pzs/vuetify-toast
 */

import Vue from 'vue';
import Toast from './AppToast.vue';

export interface IToastOptions {
  active?: boolean;
  text?: string;
  icon?: string;
  color?: 'success' | 'info' | 'error';
  timeout?: number;
  dismissible?: boolean;
  [key: string]: any;
}

let toastCmp: any = null;

const defaultOptions: IToastOptions = {
  text: '',
  icon: '',
  color: 'info',
  timeout: 3000,
  dismissible: true,
};

function createToastCmp() {
  const cmp = new Vue(Toast);

  document.body.appendChild(cmp.$mount().$el);

  return cmp;
}

function getToastCmp() {
  if (!toastCmp) {
    toastCmp = createToastCmp();
  }

  return toastCmp;
}

function show(options = {}): void {
  getToastCmp().show({ ...defaultOptions, ...options });
}

function close(): void {
  getToastCmp().close();
}

function createShorthand(color: string): (text: string, options?: IToastOptions) => void {
  return (text: string, options: IToastOptions = {}) => show({ color, text, ...options });
}

export default {
  show,
  close,
  getToastCmp,
  defaultOptions,
  error: createShorthand('error'),
  info: createShorthand('info'),
  success: createShorthand('success'),
};

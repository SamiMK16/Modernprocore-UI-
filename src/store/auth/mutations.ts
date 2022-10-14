import AuthStorage from '@/services/auth-storage';
import { MutationTree } from 'vuex';
import { AuthState } from './types';

export const SAVE_USER = 'SAVE_USER';
export const SAVE_COMPANY = 'SAVE_COMPANY';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const LOGOUT = 'LOGOUT';
export const DELETE_TOKEN = 'DELETE_TOKEN';
export const SET_UPLOADING = 'SET_UPLOADING';
export const SET_USER_BRANCHES = 'SET_USER_BRANCHES';
export const SET_SELECTED_BRANCHES = 'SET_SELECTED_BRANCHES';
export const SAVE_PRISM_CONFIGURATION = 'SAVE_PRISM_CONFIGURATION';

export const mutations: MutationTree<AuthState> = {
  [SAVE_COMPANY](state, company) {
    state.company = company;
  },

  [SAVE_USER](state, user) {
    state.user = user;
  },

  [LOGOUT](state) {
    state.user = null;
    state.company = null;
    state.token = null;
    AuthStorage.deleteToken();
  },

  [SAVE_TOKEN](state, token) {
    state.token = token;
    AuthStorage.setToken(token);
  },

  [DELETE_TOKEN](state) {
    state.token = null;
    AuthStorage.deleteToken();
  },

  [SET_UPLOADING](state, uploading) {
    state.uploading = uploading;
  },
  [SET_SELECTED_BRANCHES](state, branches) {
    state.selectedUserBranches = branches;
  },
  [SET_USER_BRANCHES](state, branches) {
    state.userAllowedBranches = branches;
  },
};

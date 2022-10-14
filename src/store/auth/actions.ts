import AuthAPI from '@/services/api/auth.service.ts';
import {ActionTree} from 'vuex';
import {AuthState} from './types';
import {DELETE_TOKEN, LOGOUT, SAVE_COMPANY, SAVE_TOKEN, SAVE_USER, SET_UPLOADING,} from './mutations';

export const actions: ActionTree<AuthState, any> = {
  async login({commit, dispatch}, credentials) {
    try {
      const resp = await AuthAPI.login(credentials);
      commit(SAVE_TOKEN, resp.data.access_token);
      return await dispatch('getUser');
    } catch (error) {
      commit(LOGOUT);
      commit(DELETE_TOKEN);
      return error.message;
    }
  },

  async signUp(credentials) {
    try {
      return await AuthAPI.signup(credentials);
    } catch (error) {
      return error.response.data;
    }
  },

  logout({commit}) {
    commit(LOGOUT);
    return AuthAPI.logout();
  },

  async sendPasswordReset(context, data) {
    try {
      const resp = await AuthAPI.sendPasswordReset(data);
      return resp.data;
    } catch (error) {
      return error.response.data;
    }
  },

  async resetPassword({commit}, data) {
    commit(SET_UPLOADING, true);
    const successful = await AuthAPI.resetPassword(data).then(
      () => true,
      () => false,
    );
    commit(SET_UPLOADING, false);
    return successful;
  },

  async getUser({commit}) {
    try {
      const data = await AuthAPI.me();
      commit(SAVE_USER, data);
      return data;
    } catch (error) {
      commit(LOGOUT);
      commit(DELETE_TOKEN);
      throw error.response ? error.response.data : error.message;
    }
  },

  async getUserCompany({commit}, userId: number) {
    try {
      const resp = await AuthAPI.company(userId);
      commit(SAVE_COMPANY, resp.data);
      return resp.data;
    } catch (error) {
      return error.response.data;
    }
  },

  updateUser({commit, state}, user) {
    if (state.user === null) {
      return;
    }
    const id = state.user.webId;
    const fullUser = {...state.user, ...user};
    const requestData = {
      description: fullUser.description,
      email: fullUser.email,
      status: fullUser.status,
      phoneNumber: fullUser.phoneNumber,
      birthday: fullUser.birthday,
    };
    commit(SET_UPLOADING, true);
    return AuthAPI.update(requestData).then(
      (data: any) => {
        commit(SAVE_USER, data);
        commit(SET_UPLOADING, false);
        return data;
      },
      (error: any) => {
        commit(SET_UPLOADING, false);
        throw new Error(error.response.data);
      },
    );
  },

  validate({dispatch, state}) {
    // return Promise.resolve(true);
    if (!state.token) {
      return Promise.resolve(false);
    }
    if (!state.user) {
      return dispatch('getUser');
    }
  },
};

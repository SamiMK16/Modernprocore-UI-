import API from './handlers/base.service';

const AuthAPI = {
  login({username, password}: { username: string; password: string }) {
    return API.post(
      '../oauth/token',
      `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&grant_type=password`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${btoa(
            `${process.env.VUE_APP_CLIENT_ID}:${process.env.VUE_APP_CLIENT_SECRET}`,
          )}`,
        },
      },
    );
  },
  signup(body: any) {
    return API.post('api/user/auth/singup', body);
  },

  logout() {
    return new Promise<void>((resolve, reject) => resolve());
  },

  me() {
    return API.get('api/user/currentUser')
      .then((value) => value.data).catch(err => {
        throw err;
      });
  },

  company(userId: number) {
    return API.get(`/user/${userId}/company`);
  },

  update(data: any) {
    return API.put(`api/user/currentUser`, data).then((resp) => resp.data);
  },

  sendPasswordReset({username, type}: { username: string; type: string }) {
    return API.post('/user/forgotPassword/', {username, type});
  },

  newPassword({token, newPassword}: { token: string; newPassword: string }) {
    return API.post('/user/newPassword', {token, newPassword});
  },

  resetPassword({
                  username,
                  oldPassword,
                  newPassword,
                }: {
    username: string;
    oldPassword: string;
    newPassword: string;
  }) {
    return API.post('/user/resetPassword', {username, oldPassword, newPassword});
  },
};

export default AuthAPI;

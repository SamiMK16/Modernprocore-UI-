const AuthStorage = {
    // Local storage token names.
    accessStorageName: 'token',

    getToken() {
        return localStorage.getItem(this.accessStorageName);
    },

    setToken(token: string) {
        return localStorage.setItem(this.accessStorageName, token);
    },

    deleteToken() {
        return localStorage.removeItem(this.accessStorageName);
    },
};

export default AuthStorage;

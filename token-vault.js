const { getMasterAPIToken } = require('./logic')
const jwt = require('jsonwebtoken');

module.exports = tokenVault = {
    _token: null,
    getToken: async () => {
        const isTokenExpired = ()=> {
            const { exp: tokenExpirationDate} = jwt.decode(this._token)
            return (new Date(tokenExpirationDate * 1000) <= new Date())
        };

        if (!this._token || isTokenExpired()) this._token = await getMasterAPIToken();

        return this._token;
    },
}
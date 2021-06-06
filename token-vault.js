require('dotenv').config()
const { API_URL, MAIN_USERNAME, MAIN_PASSWORD } = process.env
const call = require('./utils/call');
const jwt = require('jsonwebtoken');


module.exports = tokenVault = {
    _token: null,
    getToken: async () => {
        const isTokenExpired = ()=> {
            const {exp: tokenExpirationDate} = jwt.decode(this._token)
            return (new Date(tokenExpirationDate * 1000) <= new Date())
            
        };

        const getMasterAPIToken = async ()=> {
            const response = await call(`${API_URL}/login`, {
                method: 'POST',
                body: JSON.stringify({
                    client_id: MAIN_USERNAME,
                    client_secret: MAIN_PASSWORD
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            const { token, error } = response;

            if (error) throw new Error(error)

            return token
        }

        if (!this._token || isTokenExpired()) this._token = await getMasterAPIToken()

        return this._token;
    },
}
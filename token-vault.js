const call = require('./utils/call');
const { API_URL, MAIN_USERNAME, MAIN_PASSWORD } = process.env
const jwt = require('jsonwebtoken');


module.exports = tokenVault = {
    _token: null,
    getToken: async () => {
        const isTokenExpired = ()=> {
            const token = jwt.decode(this._token)
            const tokenExpirationDate = token.exp
            return (new Date(tokenExpirationDate * 1000) <= new Date())
            
        };

        if (!this._token || isTokenExpired()) {
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

            this._token = token

            return this._token
        }
        return this._token;
    },
}
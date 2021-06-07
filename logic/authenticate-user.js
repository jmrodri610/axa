const { API_URL } = process.env;
const call = require('../utils/call');
const atob = require('atob');
const validate = require('../utils/validate');

module.exports = function authenticateUser (username, password) {

    validate.string(username, 'username');
    validate.string(password, 'password');

    return (async ()=> {
        const response = await call(`${API_URL}/login`, {
            method: 'POST',
            body: JSON.stringify({
                client_id: username,
                client_secret: password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        
        const { token, error, message } = response;

        if(error) throw new Error(`${error}: ${message}`)
        
        const payload = token.split('.')[1]

        const { sub: id } = JSON.parse(atob(payload))

        return id

    })()
}
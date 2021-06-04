const call = require('../utils/call');
const { API_URL, MAIN_USERNAME, MAIN_PASSWORD } = process.env

module.exports = getMasterAPIToken = ()=> {
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
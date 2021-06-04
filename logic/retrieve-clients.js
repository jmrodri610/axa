const { env: { API_URL } } = process;
const call = require('../utils/call');
const { getToken } = require('../token-vault');

module.exports = async function retrieveClients() {
    const token = await getToken();

    const response = await call(`${API_URL}/clients`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response
}
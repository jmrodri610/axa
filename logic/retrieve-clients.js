const { env: { API_URL } } = process;
const call = require('../utils/call');
const validate = require('../utils/validate');
const { getToken } = require('../token-vault');



module.exports = function retrieveClients (id, limit, name) {

    // validate.string(id, 'id')

    return (async ()=> {

        const token = await getToken();
        const response = await call(`${API_URL}/clients`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        

    })()


}
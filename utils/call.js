const fetch = require('node-fetch');
const validate = require('./validate');

module.exports = function call(url, { method = 'GET', body, headers }) {
    validate.string(method, 'method');
    validate.object(headers, 'headers');


    return (async () => {
        const response = await fetch(url, { method, body, headers })

        const result = await response.json();
        
        return result;

    })()

}
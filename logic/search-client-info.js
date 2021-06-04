const validate = require('../utils/validate');
const { REGULAR_USER_ID, ADMIN_USER_ID } = process.env;

module.exports = searchClientInfo = (id, clients, policies, limit = 10, name) => {
    if (!id) id = REGULAR_USER_ID;

    validate.string(id, 'id');
    validate.array(clients, 'clients');
    validate.array(policies, 'policies');
    validate.number(limit, 'limit');
    name && validate.string(name, 'name');


    const user = clients.find(client => client.id === id)
    if(!user) throw Error('Unauthorized')

    if (user.role === 'admin') {
        clients = clients.map(client => {
            let _policies = []
            policies.forEach(policy => {
                if (policy.clientId === client.id) _policies.push({
                    id: policy.id,
                    amountInsured: policy.amountInsured,
                    inceptionDate: policy.inceptionDate
                })
            })
            client.policies = _policies;

            return client
        })

        return clients.slice(0,limit)
    } else {
        let _policies = []
        policies.forEach(policy => {
            if (policy.clientId === user.id) _policies.push({
                id: policy.id,
                amountInsured: policy.amountInsured,
                inceptionDate: policy.inceptionDate
            })
        })

        user.policies = _policies;

        return user
    }

}
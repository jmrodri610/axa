const validate = require('../utils/validate');

module.exports = searchClientInfo = (id, clients, policies, limit, name) => {
    validate.string(id, 'id');
    validate.array(clients, 'clients');
    validate.array(policies, 'policies');
    name && validate.string(name, 'name');

    const user = clients.find(client => client.id === id)
    if (!user) throw Error('Unauthorized')

    if (user.role === 'admin') {
        if (name) {
            let clientFilteredByName = clients.filter(client => client.name === name || client.name.includes(name))
            if (clientFilteredByName.length) {
                clientFilteredByName = clientFilteredByName.map(item => {
                    let clientPolicies = [];
                    policies.forEach(policy => {
                        if (policy.clientId === item.id) clientPolicies.push({
                            id: policy.id,
                            amountInsured: policy.amountInsured,
                            inceptionDate: policy.inceptionDate
                        })
                    })

                    item.policies = clientPolicies

                    return item;
                })
                return clientFilteredByName.slice(0, parseInt(limit))
            } return []

        } else {
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

            return clients.slice(0, parseInt(limit))
        }
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
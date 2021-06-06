const validate = require('../utils/validate');

module.exports = searchPolicies = (id, clients, policies, limit) => {
    validate.string(id, 'id');
    validate.array(clients, 'clients');
    validate.array(policies, 'policies');

    const user = clients.find(client => client.id === id)
    if (!user) throw Error('Unauthorized')

    if (user.role === 'admin') {
        const sanitizedPolices = policies.map(policy => {
            return {
                id: policy.id,
                amountInsured: policy.amountInsured,
                inceptionDate: policy.inceptionDate,
                email: policy.email,
                installmentPayment: policy.installmentPayment
            }
        })
        return sanitizedPolices.slice(0, parseInt(limit))
    }
    let _policies = []
    policies.forEach(policy => {
        if (policy.clientId === user.id) _policies.push({
            id: policy.id,
            amountInsured: policy.amountInsured,
            inceptionDate: policy.inceptionDate,
            email: policy.email,
            installmentPayment: policy.installmentPayment
        })
    })
    return _policies


}
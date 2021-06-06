const validate = require('../utils/validate');

module.exports = searchPoliciesById = (id, queryId, clients, policies) => {
    validate.string(id, 'id');
    validate.string(queryId, 'queryId');
    validate.array(clients, 'clients');
    validate.array(policies, 'policies');

    const user = clients.find(client => client.id === id)
    if (!user) throw Error('Unauthorized')

    if (user.role === 'admin') {
        const requestedPolicies = policies.filter(policy => policy.id === queryId)
        const sanitizedPolices = requestedPolicies.map(policy => {
            return {
                id: policy.id,
                amountInsured: policy.amountInsured,
                inceptionDate: policy.inceptionDate,
                email: policy.email,
                installmentPayment: policy.installmentPayment
            }
        })
        return sanitizedPolices
    }

    const userPolicy = policies.find(policy => policy.id === queryId)
    if (userPolicy) {
        if (userPolicy.clientId !== id) throw Error('Unathorized')

        return ({
            id: userPolicy.id,
            amountInsured: userPolicy.amountInsured,
            inceptionDate: userPolicy.inceptionDate,
            email: userPolicy.email,
            installmentPayment: userPolicy.installmentPayment

        })
    }
    return []
}
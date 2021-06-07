const validate = require('../utils/validate');
const { AuthenticationError, ForbiddenError, NotFoundError } = require('../utils/errors')


module.exports = searchClientPolicyById = (id, queryId, clients, policies) => {
    validate.string(id, 'id');
    validate.string(queryId, 'queryId');
    validate.array(clients, 'clients');
    validate.array(policies, 'policies');

    const user = clients.find(client => client.id === id)
    if (!user) throw new AuthenticationError('Unauthorized')

    if (user.role === 'admin') {
        const requestedUser = clients.find(client => client.id === queryId)
        if (!requestedUser) throw new NotFoundError('Bad request')
        requestedUser.policies = []
        policies.forEach(policy => {
            if (policy.clientId === requestedUser.id) requestedUser.policies.push({
                id: policy.id,
                amountInsured: policy.amountInsured,
                inceptionDate: policy.inceptionDate,
                email: policy.email,
                installmentPayment: policy.installmentPayment
            })
        })

        return requestedUser.policies

    } else {
        if (id !== queryId) throw new ForbiddenError('Forbidden')

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

        user.policies = _policies;

        return user.policies
    }

}
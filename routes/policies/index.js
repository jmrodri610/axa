const { Router } = require('express')
const { env: { SECRET } } = process
const tokenVerifier = require('../../utils/token-verifier')(SECRET)
const { retrieveClients, retrievePolicies, searchPolicies, searchPoliciesById } = require('../../logic')
const { AuthenticationError, ForbiddenError, NotFoundError } = require('../../utils/errors')


const router = Router()

router.get('', tokenVerifier, async (req, res) => {
    const { query: { limit }, id } = req
    try {
        const clients = await retrieveClients()

        const policies = await retrievePolicies()

        const result = searchPolicies(id, clients, policies, limit)

        res.status(200).json(result)
    } catch ({ message }) {
        return res.status(401).json(message)
    }
})

router.get('/:id', tokenVerifier, async (req, res) => {
    const { id, params: { id: queryId } } = req;
    try {
        const clients = await retrieveClients()

        const policies = await retrievePolicies()

        const result = searchPoliciesById(id, queryId, clients, policies)

        res.status(200).json(result)

    } catch (error) {
        const { message } = error

        if (error instanceof AuthenticationError) return res.status(401).json(message)
        if (error instanceof ForbiddenError) return res.status(403).json(message)
        if (error instanceof NotFoundError) return res.status(404).json(message)
    }
})

module.exports = router
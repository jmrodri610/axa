const { Router } = require('express')
const { env: { SECRET } } = process
const tokenVerifier = require('../../utils/token-verifier')(SECRET)
const { retrieveClients, retrievePolicies, searchClientInfo, searchClientById, searchClientPolicyById } = require('../../logic')
const { AuthenticationError, ForbiddenError, NotFoundError } = require('../../utils/errors')

const router = Router()

router.get('', tokenVerifier, async (req, res) => {
    const { query: { limit, name }, id } = req
    try {
        const clients = await retrieveClients()

        const policies = await retrievePolicies()

        const result = searchClientInfo(id, clients, policies, limit, name)

        res.status(200).send(result)

    } catch ({ message }) {

        return res.status(401).json(message)
    }
})

router.get('/:id', tokenVerifier, async (req, res) => {
    const { id, params: { id: queryId } } = req;
    try {
        const clients = await retrieveClients()

        const policies = await retrievePolicies()

        const result = searchClientById(id, queryId, clients, policies)

        res.status(200).json(result)

    } catch (error) {
        const { message } = error

        if(error instanceof AuthenticationError) return res.status(401).json(message)
        if(error instanceof ForbiddenError) return res.status(403).json(message)
        if(error instanceof NotFoundError) return res.status(404).json(message)
    }
})

router.get('/:id/policies', tokenVerifier, async (req, res) => {
    const { id, params: { id: queryId } } = req;
    try {
        const clients = await retrieveClients()

        const policies = await retrievePolicies()

        const result = searchClientPolicyById(id, queryId, clients, policies)

        res.status(200).json(result)

    } catch (error) {
        const { message } = error

        if (error instanceof AuthenticationError) return res.status(401).json(message)
        if (error instanceof ForbiddenError) return res.status(403).json(message)
        if (error instanceof NotFoundError) return res.status(404).json(message)
    }
})

module.exports = router
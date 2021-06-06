const { Router } = require('express')
const { env: { SECRET } } = process
const tokenVerifier = require('../../utils/token-verifier')(SECRET)
const { retrieveClients, retrievePolicies, searchClientInfo, searchClientById, searchClientPolicyById } = require('../../logic')


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

    } catch ({ message }) {
        return res.status(401).json(message)
    }
})

router.get('/:id/policies', tokenVerifier, async (req, res) => {
    const { id, params: { id: queryId } } = req;
    try {
        const clients = await retrieveClients()

        const policies = await retrievePolicies()

        const result = searchClientPolicyById(id, queryId, clients, policies)

        res.status(200).json(result)

    } catch ({ message }) {
        return res.status(401).json(message)
    }
})

module.exports = router
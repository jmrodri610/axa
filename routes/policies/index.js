const { Router } = require('express')
const { env: { SECRET } } = process
const tokenVerifier = require('../../utils/token-verifier')(SECRET)
const { retrieveClients, retrievePolicies, searchPolicies, searchPoliciesById } = require('../../logic')


const router = Router()

router.get('', tokenVerifier, async (req, res) => {
    const { query: { limit = 10 }, id } = req
    try {
        const clients = await retrieveClients()
        try {
            const policies = await retrievePolicies()

            const result = searchPolicies(id, clients, policies, limit)

            res.status(200).json(result)
        } catch ({ message }) {
            return res.status(401).json(message)
        }
    } catch ({ message }) {
        return res.status(401).json(message)
    }
})

router.get('/:id', tokenVerifier, async (req, res) => {
    const { id, params: { id: queryId } } = req;
    try {
        const clients = await retrieveClients()
        try {
            const policies = await retrievePolicies()

            const result = searchPoliciesById(id, queryId, clients, policies)

            res.status(200).json(result)
        } catch ({ message }) {
            return res.status(401).json(message)
        }
    } catch ({ message }) {
        return res.status(401).json(message)
    }
})

module.exports = router
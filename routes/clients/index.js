const { Router } = require('express')
const { env: { SECRET } } = process
const tokenVerifier = require('../../utils/token-verifier')(SECRET)
const { retrieveClients, retrievePolicies, searchClientInfo } = require('../../logic')


const router = Router()

router.get('', tokenVerifier, async (req, res) => {
    const { id } = req;
    try {
        const clients = await retrieveClients()
        try {
            const policies = await retrievePolicies()

            const result = searchClientInfo(id, clients, policies)

            res.status(200).json(result)
        } catch ({message}) {
            return res.status(401).json(message)
        }
    } catch ({ message }) {
        return res.status(401).json(message)
    }
})

module.exports = router
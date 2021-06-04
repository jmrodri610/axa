const { Router } = require('express')
const { env: { SECRET } } = process
const tokenVerifier = require('../../utils/token-verifier')(SECRET)
const { retrieveClients } = require('../../logic')


const router = Router()

router.get('', tokenVerifier, async (req, res) => {
    const { id } = req;
    try {
        const clients = await retrieveClients(id)

    } catch ({ message }) {
        return res.status(401).json(message)
    }
})

module.exports = router
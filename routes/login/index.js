const { Router } = require('express')
const { env: { SECRET, TOKEN_EXP } } = process
const { authenticateUser } = require('../../logic')
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')

const jsonBodyParser = bodyParser.json()

const router = Router()

router.post('', jsonBodyParser, async (req, res) => {
    const { username, password } = req.body;
    try {

        const id = await authenticateUser(username, password)
        const token = jwt.sign({ sub: id }, SECRET, { expiresIn: TOKEN_EXP })

        res.status(200).json({ token, type: 'bearer', expires_in: TOKEN_EXP })

    } catch (error) {
        return res.status(401).json({error: error.message})
    }
})

module.exports = router
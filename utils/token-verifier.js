const jwt = require('jsonwebtoken')

module.exports = function (secret) {
    return function (req, res, next) {

        try {
            const { headers: { authorization } } = req

            authorization && ([, token] = authorization.split(' '))

            if (!token) return res.status(401).json({ message: 'no token provided' })

            const { sub: id } = jwt.verify(token, secret)

            req.id = id

            next()
        } catch ({ message }) {
            res.status(401).json({ message })
        }
    }
}
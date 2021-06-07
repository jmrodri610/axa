module.exports = class AuthenticationError extends Error {
    constructor(message) {
        super(message)

        Error.captureStackTrace(this, AuthenticationError)

        this.name = AuthenticationError.name
    }
}
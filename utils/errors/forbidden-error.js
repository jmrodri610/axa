module.exports = class ForbiddenError extends Error {
    constructor(message) {
        super(message)

        Error.captureStackTrace(this, ForbiddenError)

        this.name = ForbiddenError.name
    }
}
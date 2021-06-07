require('dotenv').config();
const { expect } = require('chai')
const authenticateUser = require('./authenticate-user')
const nock = require('nock');
const { random } = Math

describe('logic - authenticate user', () => {
    let username, password, id, credentials
    const URL = process.env.API_URL
    beforeEach(() => {
        username = `username-${random()}`
        password = `password-${random()}`

        credentials = { client_id: username, client_secret: password }

        id = '0178914c-548b-4a4c-b918-47d6a391530c'
    })

    it('should succeed on correct credentials', async () => {
        nock(URL).post('/login', credentials).reply(200, {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMTc4OTE0Yy01NDhiLTRhNGMtYjkxOC00N2Q2YTM5MTUzMGMiLCJpYXQiOjE2MTkwMjEwODUsImV4cCI6MTYxOTAyNDY4NX0.oHAC1acksFT99cH15lkRfIC0AK7PQfAR4nr6U0XSExk',
            type: 'Bearer'
        })
        const userId = await authenticateUser(username, password);

        expect(userId).to.exist
        expect(userId).to.equal(id)
        expect(typeof userId).to.equal('string')
        expect(userId.length).to.be.greaterThan(0)

    })

    it('should fail on wrong username or password', async () => {
        const username = 'wrong-username';
        const password = 'wrong-password';

        credentials = { client_id: username, client_secret: password }

        nock(URL).post('/login', credentials).reply(401, {
            statusCode: 401,
            error: 'Unauthorized',
            message: 'invalid secret or client id'
        })

        try {
            await authenticateUser(username, password)

            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist
            const { message } = error
            expect(message).to.equal(`Unauthorized: invalid secret or client id`)
        }
    })

    it('should fail on incorrect username or password', () => {
        expect(() => authenticateUser(1)).to.throw(Error, 'username with value 1 is not a string')
        expect(() => authenticateUser(true)).to.throw(Error, 'username with value true is not a string')
        expect(() => authenticateUser(undefined)).to.throw(Error, 'username with value undefined is not a string')
        expect(() => authenticateUser('')).to.throw(Error, 'username is empty or blank')


        expect(() => authenticateUser(username, 1)).to.throw(Error, 'password with value 1 is not a string')
        expect(() => authenticateUser(username, true)).to.throw(Error, 'password with value true is not a string')
        expect(() => authenticateUser(username, undefined)).to.throw(Error, 'password with value undefined is not a string')
        expect(() => authenticateUser(username, '')).to.throw(Error, 'password is empty or blank')

    })
})

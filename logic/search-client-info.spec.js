const { expect } = require('chai')
const searchClientInfo = require('./search-client-info')

describe('logic - search client info', () => {
    let clients, policies, adminId, userId, limit, name

    beforeEach(() => {
        clients = [
            {
                id: 'a0ece5db-cd14-4f21-812f-966633e7be86',
                name: 'Britney',
                email: 'britneyblankenship@quotezart.com',
                role: 'admin'
            },
            {
                id: 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb',
                name: 'Manning',
                email: 'manningblankenship@quotezart.com',
                role: 'admin'
            },
            {
                id: 'a3b8d425-2b60-4ad7-becc-bedf2ef860bd',
                name: 'Barnett',
                email: 'barnettblankenship@quotezart.com',
                role: 'user'
            },
            {
                id: '44e44268-dce8-4902-b662-1b34d2c10b8e',
                name: 'Merrill',
                email: 'merrillblankenship@quotezart.com',
                role: 'user'
            },
            {
                id: '0178914c-548b-4a4c-b918-47d6a391530c',
                name: 'Whitley',
                email: 'whitleyblankenship@quotezart.com',
                role: 'admin'
            },
            {
                id: 'a74c83c5-e271-4ecf-a429-d47af952cfd4',
                name: 'Lamb',
                email: 'lambblankenship@quotezart.com',
                role: 'user'
            },
            {
                id: '55601290-8619-4f54-b831-9c6c26c52b44',
                name: 'Ophelia',
                email: 'opheliablankenship@quotezart.com',
                role: 'user'
            },
            {
                id: '1470c601-6833-48a4-85b4-ddab9c045916',
                name: 'Jerry',
                email: 'jerryblankenship@quotezart.com',
                role: 'user'
            },
            {
                id: 'b2cbdea3-5bc6-4e14-8d21-579aba6845b2',
                name: 'Dina',
                email: 'dinablankenship@quotezart.com',
                role: 'admin'
            },
            {
                id: 'f80b6ab6-ef21-4bd9-9d87-bec464e0f60f',
                name: 'Thelma',
                email: 'thelmablankenship@quotezart.com',
                role: 'admin'
            },
            {
                id: 'a8988671-19a7-478d-b6c7-f345554b8776',
                name: 'Pamela',
                email: 'pamelablankenship@quotezart.com',
                role: 'admin'
            },
            {
                id: '12f34e63-d4f1-4701-bbad-5b4b81a66a38',
                name: 'Simone',
                email: 'simoneblankenship@quotezart.com',
                role: 'user'
            },
        ]
        policies = [
            {
                id: '64cceef9-3a01-49ae-a23b-3761b604800b',
                amountInsured: '1825.89',
                email: 'inesblankenship@quotezart.com',
                inceptionDate: '2016-06-01T03:33:32Z',
                installmentPayment: true,
                clientId: 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb'
            },
            {
                id: '7b624ed3-00d5-4c1b-9ab8-c265067ef58b',
                amountInsured: '399.89',
                email: 'inesblankenship@quotezart.com',
                inceptionDate: '2015-07-06T06:55:49Z',
                installmentPayment: true,
                clientId: 'a0ece5db-cd14-4f21-812f-966633e7be86'
            },
            {
                id: '56b415d6-53ee-4481-994f-4bffa47b5239',
                amountInsured: '2301.98',
                email: 'inesblankenship@quotezart.com',
                inceptionDate: '2014-12-01T05:53:13Z',
                installmentPayment: false,
                clientId: 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb'
            },
            {
                id: '6f514ec4-1726-4628-974d-20afe4da130c',
                amountInsured: '697.04',
                email: 'inesblankenship@quotezart.com',
                inceptionDate: '2014-09-12T12:10:23Z',
                installmentPayment: false,
                clientId: 'a0ece5db-cd14-4f21-812f-966633e7be86'
            },
            {
                id: '25202f31-fff0-481c-acfd-1f3ff2a9bcbe',
                amountInsured: '2579.16',
                email: 'inesblankenship@quotezart.com',
                inceptionDate: '2016-05-03T04:58:48Z',
                installmentPayment: false,
                clientId: 'a0ece5db-cd14-4f21-812f-966633e7be86'
            },
            {
                id: '15b4430d-96f8-468e-98c0-3caaf8b0b3b6',
                amountInsured: '645.65',
                email: 'inesblankenship@quotezart.com',
                inceptionDate: '2016-01-15T02:56:48Z',
                installmentPayment: true,
                clientId: 'a0ece5db-cd14-4f21-812f-966633e7be86'
            },
            {
                id: '5a72ae47-d077-4f74-9166-56a6577e31b9',
                amountInsured: '751.67',
                email: 'inesblankenship@quotezart.com',
                inceptionDate: '2015-08-05T04:05:01Z',
                installmentPayment: true,
                clientId: 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb'
            },
            {
                id: '4a582500-fab6-4efe-ae89-0c9ed750d0c7',
                amountInsured: '3074.24',
                email: 'inesblankenship@quotezart.com',
                inceptionDate: '2014-06-24T09:21:06Z',
                installmentPayment: false,
                clientId: 'a0ece5db-cd14-4f21-812f-966633e7be86'
            },
            {
                id: '3a774f4e-0e70-488f-ac9f-ee211c8d5ece',
                amountInsured: '1930.01',
                email: 'inesblankenship@quotezart.com',
                inceptionDate: '2016-10-01T09:19:32Z',
                installmentPayment: true,
                clientId: 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb'
            },
            {
                id: 'd973993a-d35e-4d12-abb5-38083d556101',
                amountInsured: '1609.4',
                email: 'inesblankenship@quotezart.com',
                inceptionDate: '2016-01-31T03:52:33Z',
                installmentPayment: true,
                clientId: 'a0ece5db-cd14-4f21-812f-966633e7be86'
            },
            {
                id: '0eba1179-6155-41b5-bdd8-f80e1ac94cab',
                amountInsured: '1629.72',
                email: 'inesblankenship@quotezart.com',
                inceptionDate: '2016-05-03T01:53:34Z',
                installmentPayment: false,
                clientId: 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb'
            },
            {
                id: 'cd63a392-0a8c-4c48-9cbe-e0a991d65c13',
                amountInsured: '804.87',
                email: 'inesblankenship@quotezart.com',
                inceptionDate: '2015-02-13T04:21:59Z',
                installmentPayment: false,
                clientId: 'a0ece5db-cd14-4f21-812f-966633e7be86'
            },
        ]

        adminId = '0178914c-548b-4a4c-b918-47d6a391530c'
        userId = '44e44268-dce8-4902-b662-1b34d2c10b8e'

    })

    it('should succeed on correct retirve a list of clients as an admin, without limit or name query', async () => {
        
        const requestedClients = await searchClientInfo(adminId, clients, policies);
        expect(requestedClients).to.exist
        expect(requestedClients).to.be.an.instanceOf(Array)
        expect(requestedClients.length).to.be.greaterThan(0)
        expect(requestedClients[0].id).not.to.equal(adminId)
    })
    it('should succeed on correct retirve a list of clients as an admin, with default value of 10 for limit', async () => {
        
        const requestedClients = await searchClientInfo(adminId, clients, policies);
        expect(requestedClients).to.exist
        expect(requestedClients).to.be.an.instanceOf(Array)
        expect(requestedClients.length).to.equal(10)
        expect(requestedClients[0].id).not.to.equal(adminId)
    })
    it('should succeed on correct retirve a list of clients as an admin, limit of 12 clients and without name query', async () => {
        limit = 12
        const requestedClients = await searchClientInfo(adminId, clients, policies, limit);
        expect(requestedClients).to.exist
        expect(requestedClients).to.be.an.instanceOf(Array)
        expect(requestedClients.length).to.equal(12)
        expect(requestedClients[0].id).not.to.equal(adminId)
    })
    it('should succeed on correct retirve a list of clients as an admin, with name query', async () => {

        name = 'Di'
        
        const requestedClients = await searchClientInfo(adminId, clients, policies, limit, name);
        expect(requestedClients).to.exist
        expect(requestedClients).to.be.an.instanceOf(Array)
        expect(requestedClients.length).to.be.greaterThan(0)
        expect(requestedClients[0].id).not.to.equal(adminId)
        expect(requestedClients[0].name).to.include(name)

    })
    it('should succeed on correct retirve of self client information as a regular user', async () => {

        const requestedClients = await searchClientInfo(userId, clients, policies);
        expect(requestedClients).to.exist
        expect(requestedClients).to.be.an.instanceOf(Array)
        expect(requestedClients.length).to.be.greaterThan(0)
        expect(requestedClients[0].id).to.equal(userId)
    })
    
    it('should fail on incorrect parameters', () => {
        expect(() => searchClientInfo(1)).to.throw(Error, 'id with value 1 is not a string')
        expect(() => searchClientInfo(true)).to.throw(Error, 'id with value true is not a string')
        expect(() => searchClientInfo(undefined)).to.throw(Error, 'id with value undefined is not a string')
        expect(() => searchClientInfo('')).to.throw(Error, 'id is empty or blank')

        expect(() => searchClientInfo(adminId, 1)).to.throw(Error, 'clients 1 is not an array')
        expect(() => searchClientInfo(adminId, true)).to.throw(Error, 'clients true is not an array')

        expect(() => searchClientInfo(adminId, clients, 1)).to.throw(Error, 'policies 1 is not an array')
        expect(() => searchClientInfo(adminId, clients, true)).to.throw(Error, 'policies true is not an array')
    })
})

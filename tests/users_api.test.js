const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const usersInDB = require('./testsAPI_helper').usersInDB

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('secret', 10)
        const user = new User({ username: 'root', passwordHash })
        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await usersInDB()

        const newUser = {
            username: 'dev0',
            name: 'Charlie Alcant',
            password: 'pass1234'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await usersInDB()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })
})

afterAll(() => {
    mongoose.connection.close()
})

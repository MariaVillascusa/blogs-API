const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = [
    {
        title: 'First blog',
        author: 'Britney',
        url: 'sdfmdlskfsdlf',
        likes: 100
    },
    {
        title: 'Second blog',
        author: 'Brad',
        url: 'ldjgreu',
        likes: 100
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let BlogObj = new Blog(initialBlogs[0])
    await BlogObj.save()
    BlogObj = new Blog(initialBlogs[1])
    await BlogObj.save()
})

test('blogs are returned as json', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(initialBlogs.length)
})

afterAll(() => {
    mongoose.connection.close()
})

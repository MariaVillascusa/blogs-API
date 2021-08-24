const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const initialBlogs = require('./testsAPI_helper').initialBlogs
const blogsInDB = require('./testsAPI_helper').blogsInDB

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

test('blogs have id property', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    expect(response.body[0].id).toBeDefined()
})

describe('addition of a new blog', () => {
    test('create it with valid data', async () => {
        const newBlog = {
            title: 'Post blog',
            author: 'Maxi',
            url: 'doifsdf',
            likes: 370
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await blogsInDB()
        expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
        const contents = blogsAtEnd.map(b => b.title)
        expect(contents).toContain('Post blog')
    })

    test('blog without likes it means it have 0 likes', async () => {
        const newBlog = {
            title: 'No likes blog',
            author: 'Toni',
            url: 'protiren'
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
        const blogsAtEnd = await blogsInDB()
        expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
    })

    test('fails with status code 400 if data invaild', async () => {
        const newBlog = {
            author: 'Peter'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await blogsInDB()
        expect(blogsAtEnd).toHaveLength(initialBlogs.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})

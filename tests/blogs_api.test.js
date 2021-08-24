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

test('blogs have id property', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    expect(response.body[0].id).toBeDefined()
})

test('create a blog', async () => {
    const newBlog = {
        title: 'Post blog',
        author: 'Maxi',
        url: 'doifsdf',
        likes: 370
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)
    expect(response.body).toHaveLength(initialBlogs.length + 1)
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
        .expect(201)
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length + 1)
})

afterAll(() => {
    mongoose.connection.close()
})

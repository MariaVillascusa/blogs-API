const Blog = require('../models/blog')
const User = require('../models/user')

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

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog)
}

const usersInDB = async () => {
    const users = await User.find({})
    return users.map(user => user)
}

module.exports = { initialBlogs, blogsInDB, usersInDB }

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

const blogsInDB = async () => {
    const notes = await Blog.find({})
    return notes.map(blog => blog)
}

module.exports = { initialBlogs, blogsInDB }

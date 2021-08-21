const dummy = (blogs) => 1

const totalLikes = blogs => {
    const total = (sum, blog) => sum + blog.likes
    return blogs.reduce(total, 0)
}

module.exports = { dummy, totalLikes }

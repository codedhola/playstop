const jwt = require("jsonwebtoken")

const authenticated = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = { authenticated }
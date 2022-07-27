const jwt = require('jsonwebtoken');

const jwtOption = {
    algorithm: 'HS256',
    expiresIn: '10s',
    issuer: 'jiwoo'
}

module.exports = {
    createAccessToken: (userData) => {
        return jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, jwtOption)
    },
    createRefreshToken: (userData) => {
        return jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET, { ...jwtOption, expiresIn: '15s' })
    },
    verify: (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if(err) resolve(null)
                resolve({ id: decoded.id, email: decoded.email })
            });
        })
    },
    refreshVerify: (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                if(err) resolve(null)
                resolve({ id: decoded.id, email: decoded.email })
            });
        })
    },
}
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { createAccessToken, createRefreshToken, verify, refreshVerify } = require('./jwt');

const app = express();
const PORT = process.env.PORT || 3000;

const user = [
    {
        id: 'admin',
        password: '1234',
        email: 'admin@naver.com'
    }
]

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.set('view engine', 'pug');
app.get('/', (req, res) => {
    res.render('login');
})
app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/auth/login', (req, res) => {
    const { id, password, email } = req.body;
    const targetUser = user.find(item => id === item.id);
    if(!targetUser) {
        res.status(401).json({ message: '존재하지 않는 회원입니다.' })
        return;
    }

    if(targetUser.id === id && targetUser.password === password) {
        const accessToken = createAccessToken({ id: targetUser.id, email: targetUser.email });
        const refreshToken = createRefreshToken({  id: targetUser.id, email: targetUser.email  });
        res.json({ accessToken, refreshToken });
    } else {
        res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' })
    }
})

app.post('/auth/register', (req, res) => {
    const { id, password, email } = req.body;
    if(id && password && email) {
        const isExistUser = user.some(item => id === item.id);
        if(isExistUser) {
            res.status(401).json({ message: '이미 존재하는 회원입니다.' })
            return
        } 
        user.push({
            id,
            password,
            email
        })
        res.json('ok')
    } else {
        res.status(401).json({ message: '회원가입에 실패하였습니다.' })
    }
})

app.get('/user/info', async (req, res) => {
    const userInfo = await verify(req.headers['x-auth-token']);
    if(userInfo) {
        res.json({ id: userInfo.id, email: userInfo.email })
    } else {
        res.status(401).json({ message: '인증기한이 만료되었습니다. 재발급 후 다시 시도해주세요!' })
    }
})

app.post('/refresh', async (req, res) => {
    if(req.headers['x-auth-token'] && req.headers['x-auth-refresh-token']) {
        const userInfo = await refreshVerify(req.headers['x-auth-refresh-token']);
        if(!userInfo) {
            res.status(401).json({ message: '다시 로그인 해주세요!' })
            return;
        }
        const newToken = createAccessToken(userInfo);

        res.json({ accessToken: newToken, refreshToken: req.headers['x-auth-refresh-token'] });
        return;
    }

    res.status(401).json({ message: '요청이 올바르지 않습니다.' })
})

app.listen(PORT, () => {
    console.log(`server on ${PORT}`)
})
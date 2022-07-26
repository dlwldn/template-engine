const express = require('express');
const bodyParser = require('body-parser');

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
    const targetUser = user.find(item => req.body.id === item.id);
    if(!targetUser) {
        res.status(400).json({ message: '존재하지 않는 회원입니다.' })
        return;
    }

    if(targetUser.id === req.body.id && targetUser.password === req.body.password) {
        res.send('ok');
    } else {
        res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' })
    }
})

app.post('/auth/register', (req, res) => {
    const { id, password, email } = req.body;
    if(id && password && email) {
        const isExistUser = user.some(item => id === item.id);
        if(isExistUser) {
            res.status(400).json({ message: '이미 존재하는 회원입니다.' })
            return
        } 
        user.push({
            id,
            password,
            email
        })
        res.send('ok')
    } else {
        res.status(400).json({ message: '회원가입에 실패하였습니다.' })
    }
})

app.listen(PORT, () => {
    console.log(`server on ${PORT}`)
})
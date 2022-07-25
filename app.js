const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.set('view engine', 'pug');
app.get('/', (req, res) => {
    res.render('index');
})
app.post('/login', (req, res) => {
    const ID = 'jiwoo';
    const PASSWORD = '1234';

    if(req.body.id === ID && req.body.password === PASSWORD) {
        res.send('ok');
    } else {
        res.status(500).json({ message: '회원정보가 일치하지 않습니다.' })
    }
})
app.get('/register', (req, res) => {
    res.render('register');
})

app.listen(PORT, () => {
    console.log(`server on ${PORT}`)
})
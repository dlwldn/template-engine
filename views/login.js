const $loginForm = document.querySelector('.login-form');
const $loginButton = document.querySelector('.login');

$loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    axios.post('/auth/login', { id: e.target[0].value, password: e.target[1].value })
    .then((res)=> {
        res.data === 'ok' && window.alert(`어서오세요 ${e.target[0].value}님!`)
    })
    .catch((err) => {
        window.alert(`${err.response.data.message}`)
    })
})
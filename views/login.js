
// const $id = document.querySelector('#id');
// const $password = document.querySelector('#pwd');
const $loginForm = document.querySelector('.login-form');
const $loginButton = document.querySelector('.login');

// let idInputValue = '';
// let passwordInputValue = '';

// $id.addEventListener('input', function(e) {
//     idInputValue = e.target.value;
// })
// $password.addEventListener('input', function(e) {
//     passwordInputValue = e.target.value;
// })
$loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log(e.target)
    axios.post('/login', { id: e.target[0].value, password: e.target[1].value })
    .then((res)=> {
        res.data === 'ok' && window.alert(`어서오세요 ${e.target[0].value}님!`)
    })
    .catch((err) => {
        window.alert(`${err.response.data.message}`)
    })
})
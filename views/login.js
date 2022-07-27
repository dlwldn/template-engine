const $loginDiv = document.querySelector('.login-wrapper');
const $loginForm = document.querySelector('.login-form');
const $loginButton = document.querySelector('.login');
const $loginInputs = document.querySelectorAll('.login-input');
const $userDiv = document.querySelector('.user-wrapper');
const $verifyButton = document.querySelector('.verify');
const $refreshButton = document.querySelector('.refresh');

const userToken = {
    accessToken: '',
    refreshToken: ''
};

$loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if(!e.target[0].value || !e.target[1].value) return;
    axios.post('/auth/login', { id: e.target[0].value, password: e.target[1].value })
    .then((res)=> {
        res.data.accessToken && window.alert(`어서오세요 ${e.target[0].value}님!`);
        userToken.accessToken = res.data.accessToken;
        userToken.refreshToken = res.data.refreshToken;

        Array.from($loginInputs).forEach(item => item.value = '');

        $loginDiv.style.display = 'none';
        $userDiv.style.display = 'flex';
    })
    .catch((err) => {
        window.alert(`${err.response.data.message}`)
    })
})

$verifyButton.addEventListener('click', function(e) {
    axios.get('/user/info', { 
        headers: {
            'x-auth-token': userToken.accessToken
        }
    }).then((res) => {
        window.alert(`아이디는 ${res.data.id}, 이메일은 ${res.data.email}입니다.`)
    }).catch((err)=> {
        window.alert(`${err.response.data.message}`)
    })
})

$refreshButton.addEventListener('click', function() {
    axios.post('/refresh', null, {
        headers: {
            'x-auth-token':  userToken.accessToken,
            'x-auth-refresh-token':  userToken.refreshToken
        }
    })
    .then((res) => {
        userToken.accessToken = res.data.accessToken;
        userToken.refreshToken = res.data.refreshToken;
        window.alert(`재발급 완료하였습니다.`)
    }).catch((err)=> {
        window.alert(`${err.response.data.message}`)
        $loginDiv.style.display = 'flex';
        $userDiv.style.display = 'none';
    })
})
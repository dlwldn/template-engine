const $registerForm = document.querySelector('.register-form');
const $id = document.querySelector('#id');
const $password = document.querySelector('#password');
const $passwordConfirm = document.querySelector('#password-confirm');
const $email = document.querySelector('#email');
const $submitButton = document.querySelector('.register-submit-button');

const $idValidation = document.querySelector('.validation.id');
const $passwordValidation = document.querySelector('.validation.password');
const $passwordConfirmValidation = document.querySelector('.validation.password-confirm');
const $emailValidation = document.querySelector('.validation.email');

const userFormData = {
    id: '',
    password: '',
    passwordConfirm: '',
    email: ''
}
const userFormValidation = {
    id: 'idle',
    password: 'idle',
    passwordConfirm: 'idle',
    email: 'idle'
}

$id.addEventListener('input', function(e) {
    userFormData.id = e.target.value;
})
$password.addEventListener('input', function(e) {
    userFormData.password = e.target.value;
})
$passwordConfirm.addEventListener('input', function(e) {
    userFormData.passwordConfirm = e.target.value;
})
$email.addEventListener('input', function(e) {
    userFormData.email = e.target.value;
})
$id.addEventListener('blur', function(e) {
    checkIdValidation(e.target.value);
    checkFormRequiredValue(userFormValidation);
})
$password.addEventListener('blur', function(e) {
    checkPasswordValidation(e.target.value);
    checkPasswordConfirmValidation(userFormData.passwordConfirm);
    checkFormRequiredValue(userFormValidation);
})
$passwordConfirm.addEventListener('blur', function(e) {
    checkPasswordConfirmValidation(e.target.value);
    checkFormRequiredValue(userFormValidation);
})
$email.addEventListener('blur', function(e) {
    checkEmailValidation(e.target.value);
    checkFormRequiredValue(userFormValidation);
})

const checkFormRequiredValue = (validation) => {
    const { id, password, passwordConfirm, email } = validation;

    if(id === 'valid' && password === 'valid' && passwordConfirm === 'valid' && email === 'valid') {
        $submitButton.removeAttribute('disabled')
        return true;
    } else {
        $submitButton.setAttribute('disabled', 'disabled');
        return false;
    }
}

const checkIdValidation = (value) => {
    const MAX_ID_LENGTH = 10;
    if(value.length === 0) {
        userFormValidation.id = 'idle'
        $idValidation.innerHTML = '';
        return;
    }
    if(value.length > MAX_ID_LENGTH) {
        userFormValidation.id = 'invalid'
        $idValidation.innerHTML = '아이디는 10자이내로 작성해주세요';
    } else {
        userFormValidation.id = 'valid'
        $idValidation.innerHTML = '';
    }
}
const checkPasswordValidation = (value) => {
    const MAX_ID_LENGTH = 20;
    if(value.length === 0) {
        userFormValidation.password = 'idle'
        $passwordValidation.innerHTML = '';
        return;
    }
    if(value.length > MAX_ID_LENGTH) {
        userFormValidation.password = 'invalid'
        $passwordValidation.innerHTML = '비밀번호는 20자 이내로 작성해주세요';
    } else {
        userFormValidation.password = 'valid'
        $passwordValidation.innerHTML = '';
    }
}
const checkPasswordConfirmValidation = (value) => {
    if(value.length === 0) {
        userFormValidation.passwordConfirm = 'idle'
        $passwordConfirmValidation.innerHTML = '';
        return;
    }
    if(userFormData.password !== value) {
        userFormValidation.passwordConfirm = 'invalid'
        $passwordConfirmValidation.innerHTML = '비밀번호가 일치하지 않습니다.';
    } else {
        userFormValidation.passwordConfirm = 'valid'
        $passwordConfirmValidation.innerHTML = '';
    }
}
const checkEmailValidation = (value) => {
    const emailReg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
        if(value.length === 0) {
            userFormValidation.email = 'idle'
            $emailValidation.innerHTML = '';
            return;
        }
        if(!emailReg.test(value)) {
            userFormValidation.email = 'invalid'
            $emailValidation.innerHTML = '이메일 형식이 올바르지 않습니다.';
        } else {
            userFormValidation.email = 'valid'
            $emailValidation.innerHTML = '';
        }
}

$registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const { id, password, email } = userFormData;

    axios.post('/auth/register', {
        id,
        password,
        email,
    }).then((res) => {
        window.alert('회원가입에 성공하였습니다.');
        window.location.href = '/'
    }).catch((err)=> {
        window.alert(err.response.data.message);
    })
})



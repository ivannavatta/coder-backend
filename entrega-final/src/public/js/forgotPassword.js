const form = document.getElementById('forgotPasswordForm')
const errorMessage = document.getElementById('error-message');

errorMessage.style.display = 'none';

form.addEventListener('submit', e => {
    e.preventDefault()

    const data = new FormData(form)

    const obj = {}

    data.forEach((value, key) => (obj[key] = value))

    fetch('/auth/forgot-password', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify(obj)
    })
    .then(res => {
        if (res.redirected) {
            window.location.href = res.url;
        }
        else if(res.status = 400) {
            errorMessage.textContent = 'This email does not exist';
            errorMessage.style.display = 'block'; 
        }
         else {
            return res.json();
        }
    })
    .then(data => {
        if (data.redirect) {
            window.location.href = data.redirect;
        } else {
            console.log(data);
        }
    })
    .catch(err => console.log(err))
});
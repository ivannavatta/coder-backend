const form = document.getElementById('loginForm')
const error = document.getElementById('error-message')

error.style.display = 'none';
form.addEventListener('submit', async e => {
    try {
        e.preventDefault()
    
        const data = new FormData(form)
    
        const obj = {}
    
        data.forEach((value, key) => (obj[key] = value))
    
        const res = await fetch('/auth', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(obj)
        })
       
        if (res.ok) {
            const info = await res.json();
            window.location.href = info.redirect;
        } else {
            const errorData = await res.json();
            error.style.display = 'block';
            error.textContent = errorData.error;
        }
    } catch (error) {
        console.log(error);
    }
});

const formFindUser = document.getElementById('form-find-user');
const userInfo = document.getElementById('view-user');
userInfo.style.display = 'none'

formFindUser.addEventListener('submit', async e => {
    try {
        e.preventDefault();
        const UserId = document.getElementById('UserId').value;
        console.log('id', UserId);
        const res = await fetch(`/users/${UserId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await res.json();

        if (res.ok) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: `User found`
            });
            if (data.payload) {
                const user = data.payload;
                console.log("🚀 ~ user:", user);
                userInfo.style.display = 'block'
                // Limpiar contenido previo
                userInfo.innerHTML = '';

                // Iterar sobre todas las propiedades del objeto usuario
                for (const key in user) {
                    if (user.hasOwnProperty(key)) {
                        const userDetail = document.createElement('p');
                        userDetail.textContent = `${key}: ${user[key]}`;
                        userInfo.appendChild(userDetail);
                    }
                }
                console.log("🚀 ~ userInfo:", userInfo);
            }
        }
    } catch (error) {
        console.log(error);
    }
});



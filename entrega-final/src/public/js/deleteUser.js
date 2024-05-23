const formDeleteUser = document.getElementById('form-delete-user')

formDeleteUser.addEventListener('submit', async e => {
    try {
    e.preventDefault()
    const UserId = document.getElementById('deleteUserId').value
    console.log('id', UserId);
    const res = await fetch(`/users/${UserId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await res.json()

    if(res.ok){
        
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
            title: `Delete User `
          });
    }
    } catch (error) {
        console.log(error);
    }
    
})
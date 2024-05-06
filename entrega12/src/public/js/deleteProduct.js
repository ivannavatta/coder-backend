const formDelete = document.getElementById('form-delete-product')

formDelete.addEventListener('submit', async e => {
    try {
    e.preventDefault()
    const productId = document.getElementById('ProductId').value
    console.log('id', productId);
    const res = await fetch(`/products/${productId}`, {
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
            title: `Delete Product `
          });
    }
    } catch (error) {
        console.log(error);
    }
    
})